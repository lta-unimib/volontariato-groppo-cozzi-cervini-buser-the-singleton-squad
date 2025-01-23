package com.unimib.singletonsquad.doit.exception.common;

import com.unimib.singletonsquad.doit.exception.auth.*;
import com.unimib.singletonsquad.doit.exception.resource.*;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import java.util.NoSuchElementException;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundGeneralException.class)
    public ResponseEntity<ResponseMessage> handleResourceNotFoundException(ResourceNotFoundGeneralException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getErrorMessage());
    }

    @ExceptionHandler(RecordNotFoundGeneralException.class)
    public ResponseEntity<ResponseMessage> handleRecordNotFoundException(RecordNotFoundGeneralException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getErrorMessage());
    }

    @ExceptionHandler(InvalidRoleGeneralException.class)
    public ResponseEntity<ResponseMessage> handleInvalidRoleException(InvalidRoleGeneralException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, ex.getErrorMessage());
    }

    // Handling validation exceptions
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseMessage> handleValidationException(MethodArgumentNotValidException ex) {
        String message = String.format("Validation error: %s", ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ResponseMessage> handleMissingParams(MissingServletRequestParameterException ex) {
        String message = String.format("%s\nMissing parameter: %s", ex.getMessage(), ex.getParameterName());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseMessage> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }
    @ExceptionHandler(InvalidEmailTokenException.class)
    public ResponseEntity<ResponseMessage> invalidEmailToken(InvalidEmailTokenException ex) {
        return buildErrorResponse(HttpStatus.PRECONDITION_FAILED, ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ResponseMessage> handleAccessDenied(AccessDeniedException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, String.format("Access denied: %s", ex.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseMessage> handleBadCredentials(BadCredentialsException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ResponseMessage> handleNoSuchElement(NoSuchElementException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, String.format("Element not found: %s", ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseMessage> handleIllegalArgument(IllegalArgumentException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, String.format("Invalid argument: %s", ex.getMessage()));
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ResponseMessage> handleAuthException(AuthException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyRegisteredGeneralException.class)
    public ResponseEntity<ResponseMessage> handleUserAlreadyRegistered(UserAlreadyRegisteredGeneralException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(UserNotRegisteredGeneralException.class)
    public ResponseEntity<ResponseMessage> handleUserNotRegistered(UserNotRegisteredGeneralException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UniqueResourceAlreadyExistsGeneralException.class)
    public ResponseEntity<ResponseMessage> handleUniqueResourceAlreadyExists(UniqueResourceAlreadyExistsGeneralException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ResponseMessage> handleAuthenticationException(AuthenticationException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(HttpClientErrorException.MethodNotAllowed.class)
    public ResponseEntity<ResponseMessage> handleMethodNotAllowedException(HttpClientErrorException.MethodNotAllowed ex) {
        return buildErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage());
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ResponseMessage> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        String message = String.format("Request method '%s' is not supported", ex.getMethod());
        return buildErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, message);
    }
    @ExceptionHandler(InvalidDateException.class)
    public ResponseEntity<ResponseMessage> handleInvalidDate(InvalidDateException ex) {
        String message = String.format("Invalid date: %s", ex.getMessage());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<ResponseMessage> handleIllegalAccessException(IllegalAccessException ex) {
        String message = String.format("IllegalAccessException: %s", ex.getMessage());
        return buildErrorResponse(HttpStatus.FORBIDDEN, message);
    }
    @ExceptionHandler(HttpGeneralException.class)
    public ResponseEntity<ResponseMessage> handleHttpGeneralException(HttpGeneralException ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessage> handleGenericException(Exception ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, String.format("Internal server error: %s", ex.getMessage()));
    }

    /// Build the error response
    private ResponseEntity<ResponseMessage> buildErrorResponse(HttpStatus status, String message) {
        ResponseMessage messageResponse = ResponseMessageUtil.createOnlyResponseMessage(message, status, null);
        return new ResponseEntity<>(messageResponse, status);
    }
}
