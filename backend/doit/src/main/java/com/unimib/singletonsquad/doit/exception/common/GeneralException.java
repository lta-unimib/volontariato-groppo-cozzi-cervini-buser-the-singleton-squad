package com.unimib.singletonsquad.doit.exception.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public abstract class GeneralException extends RuntimeException {
    private final HttpStatus errorCode;
    private final String errorMessage;

    protected GeneralException(HttpStatus errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

