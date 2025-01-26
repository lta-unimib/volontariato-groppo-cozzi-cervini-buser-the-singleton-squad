package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class VolunteerDTO  {
    @NotNull
    @NotBlank
    @JsonProperty("firstName")
    private String name;
    @JsonProperty("lastName")
    @NotNull
    @NotBlank
    private String surname;
    @JsonProperty("email")
    @NotNull
    @NotBlank
    private String email;
    @JsonProperty("password")
    @NotNull
    @NotBlank
    private String password;
    @JsonProperty("description")
    @NotNull
    @NotBlank
    private String description;
    @JsonProperty("city")
    @NotNull
    @NotBlank
    private String city;
    @JsonProperty("preferences")
    @NotNull
    private List<String> favCategories;
    @JsonProperty("availability")
    @NotNull
    private AvailabilityDTO availability;
    @JsonProperty("role")
    private String role;
}
