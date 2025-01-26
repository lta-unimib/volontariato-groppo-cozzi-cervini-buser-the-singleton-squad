package com.unimib.singletonsquad.doit.exception.auth;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class InvalidRoleGeneralException extends GeneralException {
        public InvalidRoleGeneralException(String errorMessage) {
            super(HttpStatus.FORBIDDEN, errorMessage);
        }
    }
