package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OrganizationDTO{
    @JsonProperty("organizationName")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("VATNumber")
    private String vatNumber;
    @JsonProperty("city")
    private String city;
    @JsonProperty("description")
    private String description;
    @JsonProperty("preferences")
    private List<String> preferences;
    @JsonProperty("website")
    private String webSite;
    @JsonProperty("role")
    private String role;

}
