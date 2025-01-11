package com.unimib.singletonsquad.doit.domain;

import com.unimib.singletonsquad.doit.domain.common.AuthenticationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class AuthenticationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;//id entity
    private String loginId;//passato dal frontend
    private String role;
    private String userdId;//Id utente db
    @Enumerated(EnumType.STRING)
    private AuthenticationStatus status;
    boolean isRegistered;//false default;
    String token;
}
