package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class OrganizationDTO{
    @JsonProperty("organizationName")
    @NotNull
    @NotEmpty
    private String name;
    @JsonProperty("email")
    @NotNull
    @NotEmpty
    private String email;
    @JsonProperty("password")
    @NotNull
    @NotEmpty
    private String password;
    @JsonProperty("VATNumber")
    private String vatNumber;
    @JsonProperty("city")
    @NotNull
    @NotEmpty
    private String city;
    @JsonProperty("description")
    @NotNull
    @NotEmpty
    private String description;
    @JsonProperty("preferences")
    private List<String> preferences;
    @JsonProperty("website")
    private String webSite;
    @JsonProperty("role")
    @NotNull
    @NotEmpty
    private String role;

}
