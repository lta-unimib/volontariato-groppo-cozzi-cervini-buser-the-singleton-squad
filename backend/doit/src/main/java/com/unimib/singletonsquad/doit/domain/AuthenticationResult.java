package com.unimib.singletonsquad.doit.domain;

import com.nimbusds.jose.shaded.gson.JsonObject;
import com.unimib.singletonsquad.doit.domain.common.VolunteerRequestStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class AuthenticationResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String loginId;
    @Enumerated(EnumType.STRING)
    private VolunteerRequestStatus status;

}
