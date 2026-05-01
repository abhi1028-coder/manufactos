package com.manufactos.core.service;

import com.manufactos.core.config.JwtUtil;
import com.manufactos.core.model.dto.AuthResponse;
import com.manufactos.core.model.dto.UserDto;
import com.manufactos.core.model.entity.User;
import com.manufactos.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private static final String OTP_PREFIX = "otp:";
    private static final Duration OTP_TTL  = Duration.ofMinutes(10);
    private static final long ACCESS_EXPIRY_SECS = 3600L;

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final StringRedisTemplate redisTemplate;

    /**
     * Generates a 6-digit OTP, stores it in Redis, and logs it.
     * In production, replace the log with an SMS gateway call (e.g., MSG91 / Kaleyra).
     */
    public void sendOtp(String phone) {
        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(1_000_000));
        redisTemplate.opsForValue().set(OTP_PREFIX + phone, otp, OTP_TTL);
        // TODO: replace with SMS gateway call
        log.info("[DEV ONLY] OTP for {}: {}", phone, otp);
    }

    /**
     * Validates OTP and returns a signed JWT if the user exists.
     * Creates a stub user on first login to ease development.
     */
    public AuthResponse verifyOtp(String phone, String otp) {
        String storedOtp = redisTemplate.opsForValue().get(OTP_PREFIX + phone);

        // For local dev, allow master OTP '123456'
        boolean valid = otp.equals(storedOtp) || "123456".equals(otp);
        if (!valid) {
            throw new IllegalArgumentException("Invalid or expired OTP");
        }

        redisTemplate.delete(OTP_PREFIX + phone);

        User user = userRepository.findByPhone(phone).orElseGet(() -> {
            log.info("First login for {}  — creating stub user", phone);
            // NOTE: In production, new users must be pre-registered by an admin.
            // This auto-creation is only for development convenience.
            throw new IllegalStateException("User not registered. Contact your plant admin.");
        });

        String accessToken = jwtUtil.generateAccessToken(user.getPhone(), Map.of(
                "userId",  user.getId().toString(),
                "role",    user.getRole().name(),
                "plantId", user.getPlant().getId().toString()
        ));
        String refreshToken = jwtUtil.generateRefreshToken(user.getPhone());

        UserDto userDto = new UserDto(
                user.getId(),
                user.getPhone(),
                user.getName(),
                user.getRole().name(),
                user.getPlant().getId()
        );

        return new AuthResponse(accessToken, refreshToken, ACCESS_EXPIRY_SECS, userDto);
    }
}
