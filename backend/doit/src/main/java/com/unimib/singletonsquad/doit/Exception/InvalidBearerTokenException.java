package com.unimib.singletonsquad.doit.Exception;

public class InvalidBearerTokenException extends SecurityException {
    public InvalidBearerTokenException(String message, String path) {
        super(message, path);
    }
}