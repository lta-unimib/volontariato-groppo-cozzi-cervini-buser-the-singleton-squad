package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.ExceptionGenerale;
import org.springframework.http.HttpStatus;

public class RecordNotFoundException  extends ExceptionGenerale {
    public RecordNotFoundException(String errorMessage) {
        super(HttpStatus.NOT_FOUND, errorMessage);
    }
}
