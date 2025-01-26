package com.unimib.singletonsquad.doit.dto.send;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class VolunteerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private VolunteerPreferences preferences;
    private String description;


}
