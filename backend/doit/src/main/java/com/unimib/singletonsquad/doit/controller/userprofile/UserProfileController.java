package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.management.relation.RoleInfoNotFoundException;

@Component
public abstract class UserProfileController {

    private final RegisteredUserService userVerify;
    @Autowired
    protected UserProfileController(RegisteredUserService userVerify) {
        this.userVerify = userVerify;
    }

    protected String validateTokenAndGetEmail(final HttpServletRequest request,
                                              final UserRole userRole) throws RoleInfoNotFoundException {
        return this.userVerify.getUserEmailAndIsRegistered(userRole, request);
    }

    protected ResponseEntity<ResponseMessage> sendResponseMessage(final String message, HttpStatus status, Object data) {
        return ResponseMessageUtil.createResponseSuccess(message, status, data);
    }
}
