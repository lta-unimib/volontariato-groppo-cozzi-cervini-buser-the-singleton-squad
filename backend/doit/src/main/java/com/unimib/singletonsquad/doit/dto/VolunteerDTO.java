package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VolunteerDTO {
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
    /*@JsonProperty("preferences")
    private VolunteerPreferences volunteerPreferences;*/
}
