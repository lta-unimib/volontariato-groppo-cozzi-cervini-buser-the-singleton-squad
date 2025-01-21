package com.unimib.singletonsquad.doit.controller.userProfile;

import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
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
    private final UserVerify userVerify;

    protected String validateTokenAndGetEmail(final HttpServletRequest request, final UserRole userRole) {
        return this.userVerify.validateUserRoleFromToken(request, userRole);
    }

    protected ResponseMessage sendResponseMessage(final String message, HttpStatus status, Object data) {
        return ResponseMessageUtil.createResponse(message, HttpStatus.OK, data);
    }


    public abstract ResponseMessage deleteUser(final HttpServletRequest request) throws Exception;
    public abstract ResponseMessage getUser(final HttpServletRequest request) throws Exception;
}
