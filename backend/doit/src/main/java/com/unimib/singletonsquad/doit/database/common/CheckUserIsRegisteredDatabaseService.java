package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.RoleInfoNotFoundException;

@Service
@Transactional
@AllArgsConstructor
public class CheckUserIsRegisteredDatabaseService {

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;


    public void checkUserIsRegistered(final String email, final UserRole role) throws Exception {
        switch (role) {
            case volunteer:
                if(this.volunteerDatabaseService.findVolunteerByEmail(email) == null)
                    throw new RecordNotFoundGeneralException(String.format("Volunteer %s not found", email));
                break;
            case organization:
                if(this.organizationDatabaseService.findOrganizationByEmail(email) == null)
                    throw new RecordNotFoundGeneralException(String.format("Organization %s not found", email));
                break;
            default:
                throw new RoleInfoNotFoundException(String.format("Role %s not found", role));
        }
    }

}
