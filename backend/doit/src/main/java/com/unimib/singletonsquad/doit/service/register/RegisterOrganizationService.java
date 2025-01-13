package com.unimib.singletonsquad.doit.service.register;



import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterOrganizationService {

    @Autowired
    private OrganizationMapper volunteerMapper;
    @Autowired
    private OrganizationService volunteerService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


    public String registerOrganization(OrganizationDTO volunteer) throws Exception{
        String volunteerEmail = volunteer.getEmail();
        if(this.isAlreadyRegistered(volunteerEmail))
            throw new IllegalArgumentException("The volunteer is already registered");

        String passwordEncoded = this.encryptPassword(volunteer.getPassword());
        volunteer.setPassword(passwordEncoded);
        Organization user = this.createVolunteer(volunteer);
        this.volunteerService.save(user);
        final String token = this.authenticationSetUp.setUpNewAuthSecurityContext(volunteer.getPassword(),"volunteer", volunteer.getEmail());
        return token;
    }

    //check if this email is already being used
    private boolean isAlreadyRegistered(final String email) {
        return (this.volunteerService.findOrganizationByEmail(email).isPresent());
    };
    //hash user password
    private String encryptPassword(final String password) {
        return this.passwordEncoder.encode(password);
    }

    private Organization createVolunteer(final OrganizationDTO volunteer) throws Exception{
        return this.volunteerMapper.mapToOrganization(volunteer);
    }
}

