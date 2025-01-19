package com.unimib.singletonsquad.doit.exception.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;

@Getter
@Setter
public class ErrorExceptionResponse {

        private HttpStatus status;
        private String message;
        private Object data;

        public ErrorExceptionResponse(HttpStatus status, String errorMessage) {
            this.status = status;
            this.data= null ;
            this.message = errorMessage;
        }

    }
