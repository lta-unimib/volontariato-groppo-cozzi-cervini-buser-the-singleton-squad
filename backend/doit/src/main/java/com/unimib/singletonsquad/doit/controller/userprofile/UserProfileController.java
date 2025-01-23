package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
@Component
@AllArgsConstructor
@NoArgsConstructor(force = true)
public abstract class UserProfileController {
    @Autowired
    private RegisteredUserService userVerify;

    protected String validateTokenAndGetEmail(final HttpServletRequest request,
                                              final UserRole userRole) throws Exception {
        return this.userVerify.getUserEmailAndIsRegistered(userRole, request);
    }

    /// TODO CREARE UN METODO IN ResponseMessageUtil --> SEND OK RESPONSE CHE TORNA UNA RESPONSEENTITY<ResponseMessage></ResponseMessage>
    protected ResponseEntity<ResponseMessage> sendResponseMessage(final String message, HttpStatus status, Object data) {
        return ResponseMessageUtil.createResponseSuccess(message, HttpStatus.OK, data);
    }

}
