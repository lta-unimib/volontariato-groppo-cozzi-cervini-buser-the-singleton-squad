package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import org.springframework.http.HttpStatus;

public class UniqueResourceAlreadyExistsGeneralException extends GeneralException {
    public UniqueResourceAlreadyExistsGeneralException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
