package com.unimib.singletonsquad.doit.exception.validation;

public class EmailException extends IllegalArgumentException {
    public EmailException(String message) {
        super(message);
    }

    public EmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmailException(Throwable cause) {
        super(cause);
    }
}
