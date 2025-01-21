package com.unimib.singletonsquad.doit.service.user;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.User;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleInfoNotFoundException;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class RegisteredUserService {

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;


    //TODO: TEST CAPIRE SE FUNZIONA
    //TODO IMPLEMENATE SEMPRE IL TOKEN SUL CONTROLLO
    public String getUserEmail()  throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated())
            return authentication.getName();
        else
            throw new AuthenticationException("User is not authenticated");

    }

    public String getUserEmailAndIsRegistered(final UserRole userRole)  throws Exception {
        String email = getUserEmail();
        isRegistered(email, userRole);
        return email;
    }

    public void isRegistered(@NotNull final String email, final UserRole role) throws Exception {
        switch (role) {
            case volunteer:
                if(this.volunteerDatabaseService.findVolunteerByEmail(email).isEmpty())
                    throw new RecordNotFoundGeneralException(String.format("Volunteer %s not found", email));
                break;
            case organization:
                if(this.organizationDatabaseService.findOrganizationByEmail(email).isEmpty())
                    throw new RecordNotFoundGeneralException(String.format("Organization %s not found", email));
                break;
            default:
                throw new RoleInfoNotFoundException(String.format("Role %s not found", role));
        }
    }

    public User getFromDatabaseByEmail(@NotNull final String email, final UserRole userRole) throws Exception {
        /**
         * SE FUNZIONA AGGINGERE QUI LA CHIAMATA PER OTTENERE L'EMAIL
         */

        this.isRegistered(email, userRole);
        switch (userRole) {
            case volunteer -> {
                return this.volunteerDatabaseService.findVolunteerByEmail(email)
                        .orElseThrow(() -> new RecordNotFoundGeneralException(String.format("Volunteer %s not found", email)));
            }
            case organization -> {
                return this.organizationDatabaseService.findOrganizationByEmail(email)
                        .orElseThrow(() -> new RecordNotFoundGeneralException(String.format("Organization %s not found", email)));
            }
            default -> {
                throw new RoleInfoNotFoundException(String.format("Role %s not found", userRole));
            }
        }
    }


}
