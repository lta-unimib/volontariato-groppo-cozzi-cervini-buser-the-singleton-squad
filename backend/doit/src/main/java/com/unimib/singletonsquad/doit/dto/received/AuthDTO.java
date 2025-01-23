package com.unimib.singletonsquad.doit.dto.received;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthDTO {
    private String email;
    private String password;
}

