package com.unimib.singletonsquad.doit.exception.resource;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MethodNotFoundException extends RuntimeException {
    private String path;

    public MethodNotFoundException(String message, String path) {
        super(message);
        this.path = path;
    }
}
