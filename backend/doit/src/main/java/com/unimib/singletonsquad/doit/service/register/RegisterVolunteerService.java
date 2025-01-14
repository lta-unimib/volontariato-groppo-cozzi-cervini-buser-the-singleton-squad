package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
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
        Volunteer user = this.volunteerMapper.createVolunteer(volunteer);
        this.volunteerService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(
                volunteer.getPassword(),"volunteer", volunteer.getEmail());
    }
    private boolean isAlreadyRegistered(final String email) {
        return (this.volunteerService.findVolunteerByEmail(email).isPresent());
    };
    private String encryptPassword(final String password) {
        return this.passwordEncoder.encode(password);
    }
}

