package com.unimib.singletonsquad.doit.exception.auth;

import com.unimib.singletonsquad.doit.exception.common.ExceptionGenerale;
import org.springframework.http.HttpStatus;

public class InvalidRoleException extends ExceptionGenerale {
        public InvalidRoleException(String errorMessage) {
            super(HttpStatus.BAD_REQUEST, errorMessage);
        }
    }
