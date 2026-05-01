package com.manufactos.core.controller;

import com.manufactos.core.model.dto.AuthResponse;
import com.manufactos.core.model.dto.LoginRequest;
import com.manufactos.core.model.dto.SendOtpRequest;
import com.manufactos.core.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/send-otp
     * Sends a 6-digit OTP to the provided mobile number.
     */
    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        authService.sendOtp(request.phone());
        return ResponseEntity.ok(Map.of(
                "message", "OTP sent successfully",
                "expiresIn", "600"
        ));
    }

    /**
     * POST /api/auth/login
     * Verifies OTP and returns JWT access + refresh tokens.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.verifyOtp(request.phone(), request.otp());
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/refresh
     * Exchanges a refresh token for a new access token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(
            @RequestBody Map<String, String> body) {
        // Stub: in production, validate refresh token from Redis and return new access token
        return ResponseEntity.ok(Map.of(
                "accessToken", "stub-refreshed-token",
                "message", "Token refresh not yet implemented"
        ));
    }

    /**
     * POST /api/auth/logout
     * Invalidates the current session (removes refresh token from Redis).
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        // Stub: in production, revoke refresh token from Redis
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
