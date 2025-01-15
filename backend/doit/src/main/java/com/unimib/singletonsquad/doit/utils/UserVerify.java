package com.unimib.singletonsquad.doit.utils;

import com.unimib.singletonsquad.doit.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserVerify {

    @Autowired
    private JWTUtils jwtUtils;

    public static boolean checkUserRole(String role) {
        return (role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("organization"));
    }

    public void checkUserRoleFromToken(final String token, final String roleDesired) throws Exception {
        String roleFromToken = this.jwtUtils.extractClaimByName(token, "role").toString();
        if(!roleFromToken.equals(roleDesired))
            throw new Exception(String.format("Invalid user role: %s", roleDesired));
    }
}
