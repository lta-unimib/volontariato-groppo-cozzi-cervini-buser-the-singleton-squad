package com.unimib.singletonsquad.doit.service.registration;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserAlreadyRegisteredGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationSetUp;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RegistrationOrganizationService {

    private final OrganizationMapper volunteerMapper;
    private final OrganizationDatabaseService organizationService;
    private  final AuthenticationSetUp authenticationSetUp;


    public String registerOrganization(OrganizationDTO organization) throws UserAlreadyRegisteredGeneralException{
        String organizationEmail = organization.getEmail();
        if(this.isAlreadyRegistered(organizationEmail))
            throw new UserAlreadyRegisteredGeneralException("An organization with email: " + organizationEmail + " is already registered");
        if(this.nameIsAlreadyTaken(organization.getName())) {
            throw new UserAlreadyRegisteredGeneralException("An organization with name " + organization.getName() + " is already registered");
        }

        Organization user = this.createVolunteer(organization);
        this.organizationService.save(user);
        return this.authenticationSetUp.setUpNewAuthSecurityContext(organization.getPassword(), UserRole.ORGANIZATION.name(), organization.getEmail());
    }

    private boolean isAlreadyRegistered(final String email) {
        try{
            this.organizationService.findOrganizationByEmail(email);
            return true;
        }catch(Exception e){
            return false;
        }

    }

    private boolean nameIsAlreadyTaken(final String name) {
        try {
            this.organizationService.findOrganizationByName(name);
            return true;
        }catch(Exception e){
            return false;
        }
    }


    private Organization createVolunteer(final OrganizationDTO volunteer){
        return this.volunteerMapper.mapToOrganization(volunteer);
    }
}

