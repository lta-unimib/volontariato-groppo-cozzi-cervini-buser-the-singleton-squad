package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserAlreadyRegisteredGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterOrganizationService {

    @Autowired
    private OrganizationMapper volunteerMapper;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


    public String registerOrganization(OrganizationDTO organization) throws Exception{
        String organizationEmail = organization.getEmail();
        System.out.println("Mail:" + organizationEmail);
        if(this.isAlreadyRegistered(organizationEmail))
            throw new UserAlreadyRegisteredGeneralException("An organization with email: " + organizationEmail + " is already registered");
        if(this.nameIsAlreadyTaken(organization.getName())) {
            throw new UserAlreadyRegisteredGeneralException("An organization with name " + organization.getName() + " is already registered");
        }
        String passwordEncoded = this.encryptPassword(organization.getPassword());
        organization.setPassword(passwordEncoded);
        Organization user = this.createVolunteer(organization);
        this.organizationService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(organization.getPassword(),"organization", organization.getEmail());
    }

    //check if this email is already being used
    private boolean isAlreadyRegistered(final String email) {
        return (this.organizationService.findOrganizationByEmail(email).isPresent());
    };

    private boolean nameIsAlreadyTaken(final String name) {
        return this.organizationService.findOrganizationByName(name);
    }
    //hash user password
    private String encryptPassword(final String password) {
        return this.passwordEncoder.encode(password);
    }

    private Organization createVolunteer(final OrganizationDTO volunteer) throws Exception{
        return this.volunteerMapper.mapToOrganization(volunteer);
    }
}

