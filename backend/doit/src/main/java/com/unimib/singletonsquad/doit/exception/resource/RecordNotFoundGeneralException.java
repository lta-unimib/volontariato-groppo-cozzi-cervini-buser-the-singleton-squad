package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class RecordNotFoundGeneralException extends GeneralException {
    public RecordNotFoundGeneralException(String errorMessage) {
        super(HttpStatus.NOT_FOUND, errorMessage);
    }
}
