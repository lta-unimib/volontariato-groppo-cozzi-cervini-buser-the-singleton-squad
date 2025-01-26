package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.volunteer.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.received.VolunteerDTO;
import org.springframework.stereotype.Component;

@Component
public class    VolunteerMapper {

    private VolunteerMapper() {}

    public static Volunteer mapToVolunteer(VolunteerDTO volunteerDTO){
        Volunteer volunteer = new Volunteer();
        volunteer.setName(volunteerDTO.getName());
        volunteer.setSurname(volunteerDTO.getSurname());
        volunteer.setEmail(volunteerDTO.getEmail());
        volunteer.setPassword(volunteerDTO.getPassword());
        volunteer.setDescription(volunteerDTO.getDescription());
        return volunteer;
    }


    public static Volunteer createVolunteer(final VolunteerDTO volunteerDTO){
        Volunteer volunteer = mapToVolunteer(volunteerDTO);
        StatisticVolunteer statisticVolunteer = StatisticMapper.createStatisticVolunteer(volunteer);
        volunteer.setStatistic(statisticVolunteer);
        VolunteerPreferences volunteerPreferences = new VolunteerPreferences();
        volunteerPreferences.setCity(volunteerDTO.getCity());
        volunteerPreferences.setCategories(volunteerDTO.getFavCategories());
        volunteerPreferences.setAvailability(AvailabilityMapper.map(volunteerDTO.getAvailability()));
        volunteer.setVolunteerPreferences(volunteerPreferences);
        return volunteer;
    }

    public static Volunteer updateVolunteer(final VolunteerDTO volunteerDTO, Volunteer volunteer){
        volunteer.setName(volunteerDTO.getName());
        volunteer.setSurname(volunteerDTO.getSurname());
        volunteer.setDescription(volunteerDTO.getDescription());

        VolunteerPreferences volunteerPreferences = volunteer.getVolunteerPreferences();
        if (volunteerPreferences == null) {
            volunteerPreferences = new VolunteerPreferences();
            volunteer.setVolunteerPreferences(volunteerPreferences);
        }

        volunteerPreferences.setCity(volunteerDTO.getCity());
        volunteerPreferences.setCategories(volunteerDTO.getFavCategories());
        volunteerPreferences.setAvailability(AvailabilityMapper.map(volunteerDTO.getAvailability()));

        return volunteer;
    }

    public static VolunteerDTO toVolunteerDTO(Volunteer volunteer) {
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setName(volunteer.getName());
        volunteerDTO.setSurname(volunteer.getSurname());
        volunteerDTO.setDescription(volunteer.getDescription());
        volunteerDTO.setEmail(volunteer.getEmail());
        volunteerDTO.setFavCategories(volunteer.getVolunteerPreferences().getCategories());
        volunteerDTO.setAvailability(AvailabilityMapper.toAvailabilityDTO(volunteer.getVolunteerPreferences().getAvailability()));
        volunteerDTO.setCity(volunteer.getVolunteerPreferences().getCity());
        volunteerDTO.setRole("Volunteer");
        return volunteerDTO;
    }

}
