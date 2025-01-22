package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
@Component
@AllArgsConstructor
@NoArgsConstructor(force = true)
public abstract class UserProfileController {
    @Autowired
    private RegisteredUserService userVerify;
    @Autowired
    private JWTUtils jwtUtils;

    protected String validateTokenAndGetEmail(final HttpServletRequest request,
                                              final UserRole userRole) throws Exception {
        return this.userVerify.getUserEmailAndIsRegistered(userRole, request);
    }

    protected ResponseMessage sendResponseMessage(final String message, HttpStatus status, Object data) {
        return ResponseMessageUtil.createResponse(message, HttpStatus.OK, data);
    }

    protected void checkUserRequest(final HttpServletRequest request) throws Exception {
        String token = jwtUtils.getTokenFromRequest(request);
        String role = jwtUtils.extractClaimByName(token, "role").toString();
        if(!(role.equalsIgnoreCase("organization") ||
                role.equalsIgnoreCase("volunteer")))
            throw new InvalidRoleGeneralException("Invalid role");
    }


}
