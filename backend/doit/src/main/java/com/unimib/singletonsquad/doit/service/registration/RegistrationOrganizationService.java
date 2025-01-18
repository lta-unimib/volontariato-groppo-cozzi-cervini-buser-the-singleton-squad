package com.unimib.singletonsquad.doit.service.registration;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserAlreadyRegisteredGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.service.database.organization.OrganizationService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationOrganizationService {

    @Autowired
    private OrganizationMapper volunteerMapper;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


    public String registerOrganization(OrganizationDTO organization) throws Exception{
        String organizationEmail = organization.getEmail();
        if(this.isAlreadyRegistered(organizationEmail))
            throw new UserAlreadyRegisteredGeneralException("An organization with email: " + organizationEmail + " is already registered");
        if(this.nameIsAlreadyTaken(organization.getName())) {
            throw new UserAlreadyRegisteredGeneralException("An organization with name " + organization.getName() + " is already registered");
        }

        Organization user = this.createVolunteer(organization);
        this.organizationService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(organization.getPassword(), UserRole.organization.name(), organization.getEmail());
    }

    private boolean isAlreadyRegistered(final String email) {
        return (this.organizationService.findOrganizationByEmail(email).isPresent());
    };

    private boolean nameIsAlreadyTaken(final String name) {
        return this.organizationService.findOrganizationByName(name);
    }


    private Organization createVolunteer(final OrganizationDTO volunteer) throws Exception{
        return this.volunteerMapper.mapToOrganization(volunteer);
    }
}

