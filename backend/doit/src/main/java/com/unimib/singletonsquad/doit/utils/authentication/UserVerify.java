package com.unimib.singletonsquad.doit.utils.authentication;

import com.unimib.singletonsquad.doit.exception.auth.InvalidEmailTokenException;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserVerify {

    private static final String VOLUNTEER_ROLE = String.valueOf(UserRole.volunteer);
    private static final String ORGANIZATION_ROLE = String.valueOf(UserRole.organization);

    @Autowired
    private JWTUtils jwtUtils;

    public static boolean isValidRole(String role) {
        return VOLUNTEER_ROLE.equalsIgnoreCase(role) || ORGANIZATION_ROLE.equalsIgnoreCase(role);
    }

    public boolean isRoleValidFromRequest(HttpServletRequest request) throws InvalidRoleGeneralException {
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = extractRoleFromToken(token);

        if (!isValidRole(roleFromToken)) {
            throw new InvalidRoleGeneralException("Invalid user role: " + roleFromToken);
        }

        return true;
    }

    public String validateUserRoleFromToken(HttpServletRequest request, UserRole roleDesired) throws InvalidRoleGeneralException {
        String role = roleDesired.name();
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = extractRoleFromToken(token);

        if (!roleFromToken.equalsIgnoreCase(role))
            throw new InvalidRoleGeneralException(String.format("Invalid user role: %s", role));


        String username = jwtUtils.extractUsername(token);
        if (username == null)
            throw new InvalidEmailTokenException(String.format("Invalid username %s", username));

        return username;
    }

    private String extractRoleFromToken(String token) {
        return String.valueOf(jwtUtils.extractClaimByName(token, "role"));
    }

    public String getUserEmail(final HttpServletRequest request, final String role) throws Exception {
        switch (role){
            case "volunteer":
                return validateUserRoleFromToken(request, UserRole.volunteer);
            case "organization":
                return validateUserRoleFromToken(request, UserRole.organization);
            default:
                throw new InvalidRoleGeneralException(String.format("Invalid role: %s", role));
        }
    }
}
