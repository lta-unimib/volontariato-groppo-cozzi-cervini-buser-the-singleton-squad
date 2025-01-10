package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class    LocationDTO {
    @JsonProperty("Indirizzo Completo")
    private String address;
    @JsonProperty("Città")
    private String city;
    @JsonProperty("Regione")
    private String region;
    @JsonProperty("Paese")
    private String country;
    @JsonProperty("CAP")
    private String postalCode;
}
