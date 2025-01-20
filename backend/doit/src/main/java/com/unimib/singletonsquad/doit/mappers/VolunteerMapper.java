package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.ProfilePicture;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.AddressDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@AllArgsConstructor
public class VolunteerMapper {
    private AvailabilityMapper availabilityMapper;

    public Volunteer mapToVolunteer(VolunteerDTO volunteerDTO) throws Exception {
        Volunteer volunteer = new Volunteer();
        volunteer.setName(volunteerDTO.getName());
        volunteer.setSurname(volunteerDTO.getSurname());
        volunteer.setEmail(volunteerDTO.getEmail());
        volunteer.setPassword(volunteerDTO.getPassword());
        volunteer.setDescription(volunteerDTO.getDescription());
        return volunteer;
    }


    public Volunteer createVolunteer(final VolunteerDTO volunteerDTO) throws Exception{
        Volunteer volunteer = this.mapToVolunteer(volunteerDTO);
        VolunteerPreferences volunteerPreferences = new VolunteerPreferences();
        volunteerPreferences.setCity(volunteerDTO.getCity());
        volunteerPreferences.setCategories(volunteerDTO.getFavCategories());
        volunteerPreferences.setAvailability(this.availabilityMapper.map(volunteerDTO.getAvailability()));
        volunteer.setVolunteerPreferences(volunteerPreferences);
        return volunteer;
    }

    public Volunteer updateVolunteer(final VolunteerDTO volunteerDTO, Volunteer volunteer) throws Exception {
        volunteer.setName(volunteerDTO.getName());
        volunteer.setSurname(volunteerDTO.getSurname());
        //volunteer.setPassword(volunteerDTO.getPassword());
        volunteer.setDescription(volunteerDTO.getDescription());

        VolunteerPreferences volunteerPreferences = volunteer.getVolunteerPreferences();
        if (volunteerPreferences == null) {
            volunteerPreferences = new VolunteerPreferences();
            volunteer.setVolunteerPreferences(volunteerPreferences);
        }

        volunteerPreferences.setCity(volunteerDTO.getCity());
        volunteerPreferences.setCategories(volunteerDTO.getFavCategories());
        volunteerPreferences.setAvailability(this.availabilityMapper.map(volunteerDTO.getAvailability()));

        return volunteer;
    }

}
