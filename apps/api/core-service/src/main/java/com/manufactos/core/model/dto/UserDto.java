package com.manufactos.core.model.dto;

import java.util.UUID;

public record UserDto(
    UUID id,
    String phone,
    String name,
    String role,
    UUID plantId
) {}
