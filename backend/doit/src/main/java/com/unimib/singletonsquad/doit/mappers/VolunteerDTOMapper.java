package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.AvailabilityDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerSendDTO;
import jakarta.validation.constraints.NotNull;

public class VolunteerDTOMapper {

    private VolunteerDTOMapper() {}

    public static VolunteerSendDTO mapToVolunteerDTO(Volunteer volunteer) {
        VolunteerSendDTO temp = new VolunteerSendDTO();
        temp.setFirstName(volunteer.getName());
        temp.setLastName(volunteer.getSurname());
        temp.setEmail(volunteer.getEmail());
        temp.setDescription(volunteer.getDescription());
        temp.setCity(volunteer.getVolunteerPreferences().getCity());
        temp.setAvailability(mapAvailabilityDTO(volunteer.getVolunteerPreferences().getAvailability()));
        temp.setCategories(volunteer.getVolunteerPreferences().getCategories());
        return temp;
    }
    private static AvailabilityDTO mapAvailabilityDTO(@NotNull Availability availability){
        return AvailabilityMapper.toAvailabilityDTO(availability);
    }
}
