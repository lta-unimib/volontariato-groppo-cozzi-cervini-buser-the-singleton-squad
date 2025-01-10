package com.unimib.singletonsquad.doit.exception.validation;

public class EmailException extends IllegalArgumentException {
    public EmailException(String message) {
        super(message);
    }

    // Costruttore con causa
    public EmailException(String message, Throwable cause) {
        super(message, cause);
    }

    // Costruttore solo con causa
    public EmailException(Throwable cause) {
        super(cause);
    }
}
