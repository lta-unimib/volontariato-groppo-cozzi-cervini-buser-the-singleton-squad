package com.unimib.singletonsquad.doit.exception.resource;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceNotFoundException extends RuntimeException {
    private String path;

    public ResourceNotFoundException(String message, String path) {
        super(message);
        this.path = path;
    }

}
