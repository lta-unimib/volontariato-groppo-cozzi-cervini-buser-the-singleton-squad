package com.unimib.singletonsquad.doit.Exception;

public class MissingBearerTokenException extends SecurityException {
    public MissingBearerTokenException(String message, String path) {
        super(message, path);
    }
}