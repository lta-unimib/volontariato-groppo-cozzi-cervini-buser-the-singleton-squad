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

    private static final String VOLUNTEER_ROLE = UserRole.VOLUNTEER.name();
    private static final String ORGANIZATION_ROLE = UserRole.ORGANIZATION.name();

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final JWTUtils jwtUtils;

    /// GET USER EMAL AND CHECK IF IT REGISTERED
    public String getUserEmailAndIsRegistered(final UserRole userRole, HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = getUserEmailFromToken(request, userRole);
        isRegistered(email, userRole);
        return email;
    }

    /// GET THE USER EMAIL AND NOT CHECK IF IT IS REGISTERED
    public String getUserEmail(final HttpServletRequest request) throws InvalidRoleGeneralException, InvalidEmailTokenException {
        return this.getUserEmailFromToken(request, null);
    }


    /// GET THE USER INFORMATION FROM DATABASE
    public User getUserInformations(final String email, final UserRole userRole) throws InvalidRoleGeneralException, InvalidEmailTokenException, RoleInfoNotFoundException {
        this.isRegistered(email, userRole);
        return switch (userRole) {
            case VOLUNTEER -> this.volunteerDatabaseService.findVolunteerByEmail(email);
            case ORGANIZATION -> this.organizationDatabaseService.findOrganizationByEmail(email);
            default -> throw new RoleInfoNotFoundException(String.format("Role %s not found", userRole));
        };
    }

    public String checkAndGetRoleFromRequest(@NotNull final HttpServletRequest request) throws InvalidRoleGeneralException{
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromRequest = this.extractRoleFromToken(token);
        if(!isValidRole(roleFromRequest))
            throw new InvalidRoleGeneralException(String.format("Invalid role %s", roleFromRequest));

        return roleFromRequest;
    }



    /// ===== SUPPORT METHOD =======
    private String getUserEmailFromToken(HttpServletRequest request, UserRole roleDesired)
            throws InvalidRoleGeneralException, InvalidEmailTokenException {
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = extractRoleFromToken(token);
        if (!isValidRole(roleFromToken)) {
            throw new InvalidRoleGeneralException("Invalid user role: " + roleFromToken);
        }
        if (roleDesired !=null && !roleFromToken.equalsIgnoreCase(roleDesired.name())) {
            throw new InvalidRoleGeneralException(String.format("Invalid user role: %s", roleDesired));
        }
        String username = jwtUtils.extractUsername(token);
        if (username == null) {
            throw new InvalidEmailTokenException("Invalid username from token");
        }
        return username;
    }
    
    public static boolean isValidRole(String role) {
        return VOLUNTEER_ROLE.equalsIgnoreCase(role) || ORGANIZATION_ROLE.equalsIgnoreCase(role);
    }

    private String extractRoleFromToken(String token) {
        return String.valueOf(jwtUtils.extractClaimByName(token, "role"));
    }

    private void isRegistered(@NotNull final String email, final UserRole role) throws RoleInfoNotFoundException {
        switch (role) {
            case VOLUNTEER:
                this.volunteerDatabaseService.findVolunteerByEmail(email);
                break;
            case ORGANIZATION:
                this.organizationDatabaseService.findOrganizationByEmail(email);
                break;
            default:
                throw new RoleInfoNotFoundException(String.format("Role %s not found", role));
        }
    }


}