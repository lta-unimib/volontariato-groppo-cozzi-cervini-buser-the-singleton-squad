package com.unimib.singletonsquad.doit.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message, String path) {
        super(message);
    }
}