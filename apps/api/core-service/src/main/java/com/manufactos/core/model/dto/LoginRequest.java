package com.manufactos.core.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginRequest(
    @NotBlank
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Indian mobile number")
    String phone,

    @NotBlank
    @Size(min = 6, max = 6, message = "OTP must be exactly 6 digits")
    String otp
) {}
