package com.unimib.singletonsquad.doit.service.registration;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerDTO;
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

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final AuthenticationSetUp authenticationSetUp;


    public String registerVolunteer(VolunteerDTO volunteer) throws UserAlreadyRegisteredGeneralException{
        String volunteerEmail = volunteer.getEmail();
        if(this.isAlreadyRegistered(volunteerEmail))
            throw new UserAlreadyRegisteredGeneralException("The volunteer " +volunteer.getEmail() + " is already registered");

        Volunteer user = VolunteerMapper.createVolunteer(volunteer);
        this.volunteerDatabaseService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(
                volunteer.getPassword(), UserRole.VOLUNTEER.name(), volunteer.getEmail());
    }

    private boolean isAlreadyRegistered(final String email) {
         try{
             this.volunteerDatabaseService.findVolunteerByEmail(email);
             return true;
         }
         catch(Exception e){
             return false;
         }
    }
}

