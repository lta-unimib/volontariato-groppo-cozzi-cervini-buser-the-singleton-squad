package com.unimib.singletonsquad.doit.dto.send;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class VolunteerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String description;
}
