package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInFormOrganizationDTO  extends SingInFormDTO{
    @JsonProperty("id")
    private Long id;
    @JsonProperty("organizationName")
    private String name;
    @JsonProperty("address")
    private LocationDTO address;
    @JsonProperty("preferences")
    List<String> categories;
    @JsonProperty("description")
    private String description;
    @JsonProperty("VATNumber")
    private String VATNumber;
    @JsonProperty("website")
    private String website;
}
