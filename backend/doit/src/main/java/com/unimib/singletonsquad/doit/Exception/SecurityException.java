package com.unimib.singletonsquad.doit.Exception;

public abstract class SecurityException extends RuntimeException {
    private final String path;

    protected SecurityException(String message, String path) {
        super(message);
        this.path = path;
    }

    public String getPath() {
        return path;
    }
}
