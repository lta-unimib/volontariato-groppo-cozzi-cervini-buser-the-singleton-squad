package com.unimib.singletonsquad.doit.exception;

public class InternalSecurityException extends CustomSecurityException {
    public InternalSecurityException(String message, String path) {
        super(message, path);
    }
}
