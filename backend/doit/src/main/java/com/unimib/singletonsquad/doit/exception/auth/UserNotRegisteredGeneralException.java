package com.unimib.singletonsquad.doit.exception.auth;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class UserNotRegisteredGeneralException extends GeneralException {
    public UserNotRegisteredGeneralException(String errorMessage) {super(HttpStatus.NOT_FOUND, errorMessage);}
}
