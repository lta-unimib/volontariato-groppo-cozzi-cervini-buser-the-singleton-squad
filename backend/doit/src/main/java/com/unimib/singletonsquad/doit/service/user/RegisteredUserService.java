package com.unimib.singletonsquad.doit.service.user;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.User;
import com.unimib.singletonsquad.doit.exception.auth.InvalidEmailTokenException;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleInfoNotFoundException;

@Service
@AllArgsConstructor
public class RegisteredUserService {

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final JWTUtils jwtUtils;


    /// OTTIENI LA MAIL DELLO USER E CONTROLLA CHE CI SIA REGIDTRATO
    public String getUserEmailAndIsRegistered(final UserRole userRole, HttpServletRequest request)
            throws RoleInfoNotFoundException, InvalidRoleGeneralException, InvalidEmailTokenException {
        String email = extractEmailFromToken(request, userRole);
        validateUserRegistration(email, userRole);
        return email;
    }

    /// OTTIENE TUTTE LE INFO DELLO USER E CONTROLLA CHE SIA REGISTRATO
    public User getUserInformationAndIsRegistered(final UserRole userRole, final HttpServletRequest request)
            throws InvalidRoleGeneralException, InvalidEmailTokenException {
        String email = extractEmailFromToken(request, userRole);
        switch (userRole) {
            case VOLUNTEER:
                return this.volunteerDatabaseService.findVolunteerByEmail(email);
            case ORGANIZATION:
                return this.organizationDatabaseService.findOrganizationByEmail(email);
            default:
                throw new InvalidRoleGeneralException("Invalid user role: " + userRole);
        }
    }

    /// OTTIENE IL RUOLO DALLA RICHIESTA E CONTROLLA CHE SIA VALIDO E LO RITORNA
    public UserRole extractRoleFromRequest(@NotNull final HttpServletRequest request)
            throws InvalidRoleGeneralException {
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromRequest = extractRoleFromToken(token);

        if (!isValidRole(roleFromRequest)) {
            throw new InvalidRoleGeneralException(String.format("Invalid role %s", roleFromRequest));
        }
        return UserRole.valueOf(roleFromRequest);
    }


    private String extractEmailFromToken(HttpServletRequest request, UserRole roleDesired)
            throws InvalidRoleGeneralException, InvalidEmailTokenException {
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = extractRoleFromToken(token);

        validateRole(roleFromToken, roleDesired);

        String username = jwtUtils.extractUsername(token);
        if (username == null) {
            throw new InvalidEmailTokenException("Invalid username from token");
        }
        return username;
    }


    private void validateRole(String roleFromToken, UserRole roleDesired)
            throws InvalidRoleGeneralException {
        if (!isValidRole(roleFromToken)) {
            throw new InvalidRoleGeneralException("Invalid user role: " + roleFromToken);
        }

        if (roleDesired != null && !roleFromToken.equalsIgnoreCase(roleDesired.name())) {
            throw new InvalidRoleGeneralException(String.format("Invalid user role: %s", roleDesired));
        }
    }

    ///
    private void validateUserRegistration(String email, UserRole role)
            throws RoleInfoNotFoundException {
        switch (role) {
            case VOLUNTEER -> volunteerDatabaseService.existsVolunteerByEmail(email);
            case ORGANIZATION -> organizationDatabaseService.findOrganizationByEmail(email);
            default -> throw new RoleInfoNotFoundException(String.format("Role %s not found", role));
        }
    }

    private String extractRoleFromToken(String token) {
        return String.valueOf(jwtUtils.extractClaimByName(token, "role"));
    }

    public static boolean isValidRole(String role) {
        return UserRole.VOLUNTEER.name().equalsIgnoreCase(role) ||
                UserRole.ORGANIZATION.name().equalsIgnoreCase(role);
    }
}