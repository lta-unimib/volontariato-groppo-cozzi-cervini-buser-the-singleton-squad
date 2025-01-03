package com.unimib.singletonsquad.doit.Exception;

public class InternalSecurityException extends SecurityException {
    public InternalSecurityException(String message, String path) {
        super(message, path);
    }
}
