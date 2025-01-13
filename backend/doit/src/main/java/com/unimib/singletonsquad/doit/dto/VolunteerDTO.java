package com.unimib.singletonsquad.doit.dto;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class VolunteerDTO {

    private String name;
    private String cognome;
    private String email;
    private String password;
    private String description;
    private VolunteerPreferences volunteerPreferences;
}
