package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.common.GeneralException;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ResourceNotFoundGeneralException extends GeneralException {

    public ResourceNotFoundGeneralException(String errorMessage) {
        super(HttpStatus.NOT_FOUND, errorMessage);
    }

}
