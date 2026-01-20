package com.url.shortner.Dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String email;
    private String password;
}
