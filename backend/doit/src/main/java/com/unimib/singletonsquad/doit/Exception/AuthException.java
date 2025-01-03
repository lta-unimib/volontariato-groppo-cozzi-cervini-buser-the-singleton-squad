package com.unimib.singletonsquad.doit.Exception;

import org.springframework.security.core.AuthenticationException;

public class AuthException extends AuthenticationException {
    private final String path;

    public AuthException(String message, String path) {
        super(message);
        this.path = path;
        // Rimuove lo stack trace
        this.setStackTrace(new StackTraceElement[0]);
    }

    public String getPath() {
        return path;
    }

    @Override
    public String toString() {
        return "AuthException: " + getMessage() + " (Path: " + path + ")";
    }
}
