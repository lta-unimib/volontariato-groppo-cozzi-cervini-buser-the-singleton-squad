package com.unimib.singletonsquad.doit.utils;

import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserVerify {

    @Autowired
    private JWTUtils jwtUtils;

    public static boolean checkUserRole(String role) {
        return (role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("organization"));
    }

    public boolean checkRoleFromRequest(final HttpServletRequest request) {
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = this.jwtUtils.extractClaimByName(token, "role").toString();
        return checkUserRole(roleFromToken);
    }


    public void checkUserRoleFromToken(final HttpServletRequest request, final UserRole roleDesired) throws InvalidRoleGeneralException {
        String role = String.valueOf(roleDesired);
        String token = jwtUtils.getTokenFromRequest(request);
        String roleFromToken = this.jwtUtils.extractClaimByName(token, "role").toString();
        if(!roleFromToken.equals(roleDesired))
            throw new InvalidRoleGeneralException(String.format("Invalid user role: %s", role));
    }
}
