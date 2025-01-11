package com.unimib.singletonsquad.doit.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthenticationResultDTO {
    private String authToken;
    private String redirectPath;
    private String userId;
}
