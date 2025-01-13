package com.unimib.singletonsquad.doit.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomOAuth2User{
    private String email;
    private String jwtToken;
    private String role;
}
