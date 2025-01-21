package com.unimib.singletonsquad.doit.service.registration;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserAlreadyRegisteredGeneralException;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RegistrationVolunteerService {

    private final VolunteerMapper volunteerMapper;
    private final VolunteerDatabaseService volunteerService;
    private final AuthenticationSetUp authenticationSetUp;


    public String registerVolunteer(VolunteerDTO volunteer) throws Exception{
        String volunteerEmail = volunteer.getEmail();
        if(this.isAlreadyRegistered(volunteerEmail))
            throw new UserAlreadyRegisteredGeneralException("The volunteer " +volunteer.getEmail() + " is already registered");

        Volunteer user = this.volunteerMapper.createVolunteer(volunteer);
        this.volunteerService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(
                volunteer.getPassword(), UserRole.volunteer.name(), volunteer.getEmail());
    }

    private boolean isAlreadyRegistered(final String email) {
        return (this.volunteerService.findVolunteerByEmail(email).isPresent());
    }
}

