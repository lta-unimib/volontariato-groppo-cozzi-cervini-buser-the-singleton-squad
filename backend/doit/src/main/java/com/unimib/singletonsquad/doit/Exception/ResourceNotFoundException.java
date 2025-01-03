package com.unimib.singletonsquad.doit.Exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message, String path) {
        super(message);
    }
}