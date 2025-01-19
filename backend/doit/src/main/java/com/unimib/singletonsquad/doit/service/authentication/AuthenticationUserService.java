package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.dto.AuthDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserNotRegisteredGeneralException;
import com.unimib.singletonsquad.doit.database.organization.OrganizationService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerService;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class AuthenticationUserService {

    private final VolunteerService volunteerService;
    private final OrganizationService organizationService;
    private final AuthenticationSetUp authenticationSetUp;


    public String authenticate(@NotNull final AuthDTO auth, @NotNull final String role) {

        String email = auth.getEmail();
        String password = auth.getPassword();
        if(!checkUserRegistered(email, role, password))
            throw new UserNotRegisteredGeneralException("User not registered");

        return this.authenticationSetUp.setUpNewAuthSecurityContext(password, role, email);
    }

    private boolean checkUserRegistered(final String email, final String role, final String password) {
        return switch (role) {
            case "volunteer" -> this.volunteerService.authenticateVolunteer(email, password);
            case "organization" -> this.organizationService.authenticateOrganization(email, password);
            default -> false;
        };
    }

}
