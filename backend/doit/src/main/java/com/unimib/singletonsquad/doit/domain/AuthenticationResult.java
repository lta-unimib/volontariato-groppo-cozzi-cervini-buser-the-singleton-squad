package com.unimib.singletonsquad.doit.domain;

import com.nimbusds.jose.shaded.gson.JsonObject;
import jakarta.persistence.*;

@Entity
public class AuthenticationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String loginId;
    @Embedded
    @Column(unique = true, nullable = false)
    private JsonObject response;
}
