package com.unimib.singletonsquad.doit.handler;

import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.exception.utils.ExceptionResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.MethodNotAllowedException;

import java.util.Date;

@ControllerAdvice
@RestControllerAdvice
public class GlobalExceptionHandler {



    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                "Resource Not Found",
                ex.getMessage(),
                HttpStatus.NOT_FOUND.value()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodNotAllowedException.class)
    public ResponseEntity<ExceptionResponse> handleMethodNotAllowed(MethodNotAllowedException ex) {
        ExceptionResponse response = new ExceptionResponse(
                new Date(),
                "Method Not Allowed",
                ex.getMessage(),
                HttpStatus.METHOD_NOT_ALLOWED.value()
        );
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
