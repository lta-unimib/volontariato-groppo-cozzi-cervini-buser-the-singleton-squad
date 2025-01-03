package com.unimib.singletonsquad.doit.Exception;

public abstract class CustomSecurityException extends RuntimeException {
    private final String path;

    protected CustomSecurityException(String message, String path) {
        super(message);
        this.path = path;
    }

    public String getURI() {
        return path;
    }
}
