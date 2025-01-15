package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.exception.auth.AuthException;
import com.unimib.singletonsquad.doit.exception.auth.UserNotRegisteredGeneralException;
import com.unimib.singletonsquad.doit.security.CustomOAuth2User;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationUserService {

    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private AuthenticationSetUp authenticationSetUp;


    public void authenticate(@NotNull final String password,
                             @NotNull final String role,
                             @NotNull final String email) throws Exception {

        if(!checkUserRegistered(email, role, password))
            throw new UserNotRegisteredGeneralException("User not registered");

        this.authenticationSetUp.setUpNewAuthSecurityContext(password, role, email);
    }
    private boolean checkUserRegistered(final String email, final String role, final String password) {
        return switch (role) {
            case "volunteer" -> this.volunteerService.authenticateVolunteer(email, password);
            case "organization" -> this.organizationService.authenticateOrganization(email, password);
            default -> false;
        };
    }

}
