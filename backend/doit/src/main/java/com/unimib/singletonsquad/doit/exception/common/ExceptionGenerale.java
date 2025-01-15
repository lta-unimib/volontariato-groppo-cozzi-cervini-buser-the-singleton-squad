package com.unimib.singletonsquad.doit.exception.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public abstract class ExceptionGenerale extends RuntimeException {
    private HttpStatus errorCode;
    private String errorMessage;

    public ExceptionGenerale(HttpStatus errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

