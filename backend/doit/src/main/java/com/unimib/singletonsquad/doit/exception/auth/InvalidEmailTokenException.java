package com.unimib.singletonsquad.doit.exception.auth;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class InvalidEmailTokenException extends GeneralException {
    public InvalidEmailTokenException(String errorMessage) {
        super(HttpStatus.PRECONDITION_FAILED, errorMessage);
    }
}
