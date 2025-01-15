package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.ExceptionGenerale;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ResourceNotFoundException extends ExceptionGenerale {

    public ResourceNotFoundException(String errorMessage) {
        super(HttpStatus.NOT_FOUND, errorMessage);
    }

}
