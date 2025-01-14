package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.AvailabilityMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.service.database.AvailabilityService;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterVolunteerService {

    @Autowired
    private VolunteerMapper volunteerMapper;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private VolunteerPreferencesService volunteerPreferencesService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


    public String registerVolunteer(VolunteerDTO volunteer) throws Exception{
        String volunteerEmail = volunteer.getEmail();
        if(this.isAlreadyRegistered(volunteerEmail))
            throw new IllegalArgumentException("The volunteer is already registered");

        String passwordEncoded = this.encryptPassword(volunteer.getPassword());
        volunteer.setPassword(passwordEncoded);
        Volunteer user = this.createVolunteer(volunteer);
        this.volunteerService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(volunteer.getPassword(),"volunteer", volunteer.getEmail());
    }

    //check if this email is already being used
    private boolean isAlreadyRegistered(final String email) {
        return (this.volunteerService.findVolunteerByEmail(email).isPresent());
    };
    //hash user password
    private String encryptPassword(final String password) {
        return this.passwordEncoder.encode(password);
    }

    private Volunteer createVolunteer(final VolunteerDTO volunteerDTO) throws Exception{
        Volunteer volunteer = this.volunteerMapper.mapToVolunteer(volunteerDTO);
        VolunteerPreferences volunteerPreferences = new VolunteerPreferences();
        volunteerPreferences.setCity(volunteerDTO.getCity());
        volunteerPreferences.setCategories(volunteerDTO.getFavCategories());
        volunteerPreferences.setAvailability(AvailabilityMapper.map(volunteerDTO.getAvailability()));
        volunteerPreferencesService.save(volunteerPreferences);
        volunteer.setVolunteerPreferences(volunteerPreferences);
        return volunteer;
    }
}

