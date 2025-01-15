package com.unimib.singletonsquad.doit.exception.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;

@Getter
@Setter
public class ErrorExceptionResponse {

        private String errorCode;
        private String errorMessage;
        private LocalDate timestamp;

        public ErrorExceptionResponse(HttpStatus errorCode, String errorMessage) {
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
            this.timestamp = LocalDate.now();
        }

    }
