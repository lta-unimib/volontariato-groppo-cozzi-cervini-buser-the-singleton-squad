package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class InvalidDateException extends GeneralException {
    public InvalidDateException(HttpStatus errorCode, String errorMessage) {
        super(errorCode, errorMessage);
    }
}
