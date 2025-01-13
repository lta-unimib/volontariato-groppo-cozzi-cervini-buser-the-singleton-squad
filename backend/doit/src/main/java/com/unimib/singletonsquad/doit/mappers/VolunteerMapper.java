package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.ProfilePicture;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class VolunteerMapper {

    public Volunteer mapToVolunteer(VolunteerDTO volunteerDTO) throws Exception {
        Volunteer volunteer = new Volunteer();
        volunteer.setName(volunteerDTO.getName());
        volunteer.setEmail(volunteerDTO.getEmail());
        volunteer.setVolunteerPreferences(volunteerDTO.getVolunteerPreferences());
        volunteer.setPassword(volunteerDTO.getPassword());
        volunteer.setDescription(volunteerDTO.getDescription());
        return volunteer;
    }
}
