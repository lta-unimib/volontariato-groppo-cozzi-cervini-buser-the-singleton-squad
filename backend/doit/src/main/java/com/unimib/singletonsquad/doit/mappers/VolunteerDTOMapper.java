package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.send.VolunteerDTO;

public class VolunteerDTOMapper {

    private VolunteerDTOMapper() {}

    public static VolunteerDTO mapToVolunteerDTO(Volunteer volunteer) {
        VolunteerDTO temp = new VolunteerDTO();
        temp.setFirstName(volunteer.getName());
        temp.setLastName(volunteer.getSurname());
        temp.setEmail(volunteer.getEmail());
        temp.setDescription(volunteer.getDescription());
        temp.setCity(volunteer.getVolunteerPreferences().getCity());
        temp.setPreferences(volunteer.getVolunteerPreferences());
        return temp;
    }
}
