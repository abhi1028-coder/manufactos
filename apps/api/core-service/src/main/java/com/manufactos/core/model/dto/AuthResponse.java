package com.manufactos.core.model.dto;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    long expiresIn,
    UserDto user
) {}
