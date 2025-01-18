package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.dto.AuthDTO;
import com.unimib.singletonsquad.doit.exception.auth.UserNotRegisteredGeneralException;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationUserService {

    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


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
