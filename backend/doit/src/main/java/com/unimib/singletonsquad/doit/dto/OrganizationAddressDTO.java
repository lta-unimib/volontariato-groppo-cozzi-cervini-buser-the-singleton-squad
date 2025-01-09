package com.unimib.singletonsquad.doit.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrganizationAddress {
    @Id
    private Long id;

    @JsonProperty("Indirizzo Completo")
    private String fullAddress;
    @JsonProperty("Città")
    private String city;
    private String CAP;
    @JsonProperty("Regione")
    private String State;
    @JsonProperty("Paese")
    private String Country;

}
