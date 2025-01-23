package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class VolunteerDTO  {
    @JsonProperty("firstName")
    private String name;
    @JsonProperty("lastName")
    private String surname;
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
    @JsonProperty("description")
    private String description;
    @JsonProperty("city")
    private String city;
    @JsonProperty("preferences")
    private List<String> favCategories;
    @JsonProperty("availability")
    private AvailabilityDTO availability;
    @JsonProperty("role")
    private String role;
}
