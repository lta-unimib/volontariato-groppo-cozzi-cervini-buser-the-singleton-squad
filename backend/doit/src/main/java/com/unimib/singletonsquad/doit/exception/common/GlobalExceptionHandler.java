package com.unimib.singletonsquad.doit.exception.common;

import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleException;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundException;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorExceptionResponse> handleRisorsaNonTrovataException(ResourceNotFoundException ex) {
        ErrorExceptionResponse response = new ErrorExceptionResponse(ex.getErrorCode(), ex.getErrorMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<ErrorExceptionResponse> handleRecordNonTrovataException(RecordNotFoundException ex) {
        ErrorExceptionResponse response = new ErrorExceptionResponse(ex.getErrorCode(), ex.getErrorMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidRoleException.class)
    public ResponseEntity<ErrorExceptionResponse> RoleException(InvalidRoleException ex) {
        ErrorExceptionResponse response = new ErrorExceptionResponse(ex.getErrorCode(), ex.getErrorMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpClientErrorException.MethodNotAllowed.class)
    public ResponseEntity<ErrorExceptionResponse> MethodException(HttpClientErrorException.MethodNotAllowed ex) {
        ErrorExceptionResponse response = new ErrorExceptionResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}


