package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrganizationDTO {

    @JsonProperty("organizationName")
    private String name;
    private String email;
    private String password;
    @JsonProperty("VATNumber")
    private String vatNumber;
    private String city;
    private String description;
    private String role;
    private List<String> preferenze;
    private String webSite;

}
