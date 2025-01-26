package com.unimib.singletonsquad.doit.exception.auth;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class UserAlreadyRegisteredGeneralException extends GeneralException {
    public UserAlreadyRegisteredGeneralException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
