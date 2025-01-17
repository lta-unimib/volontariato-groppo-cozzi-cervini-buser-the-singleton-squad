package com.unimib.singletonsquad.doit.exception.common;

import com.unimib.singletonsquad.doit.exception.auth.AuthException;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.exception.auth.UserAlreadyRegisteredGeneralException;
import com.unimib.singletonsquad.doit.exception.auth.UserNotRegisteredGeneralException;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundGeneralException;
import com.unimib.singletonsquad.doit.exception.resource.UniqueResourceAlreadyExistsGeneralException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
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
    public ResponseEntity<ErrorExceptionResponse> handleResourceNotFoundException(ResourceNotFoundGeneralException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getErrorMessage());
    }

    @ExceptionHandler(RecordNotFoundGeneralException.class)
    public ResponseEntity<ErrorExceptionResponse> handleRecordNotFoundException(RecordNotFoundGeneralException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getErrorMessage());
    }

    @ExceptionHandler(InvalidRoleGeneralException.class)
    public ResponseEntity<ErrorExceptionResponse> handleInvalidRoleException(InvalidRoleGeneralException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, ex.getErrorMessage());
    }

    @ExceptionHandler(HttpClientErrorException.MethodNotAllowed.class)
    public ResponseEntity<ErrorExceptionResponse> handleMethodNotAllowedException(HttpClientErrorException.MethodNotAllowed ex) {
        return buildErrorResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorExceptionResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String message = "Errore di validazione: " + ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return buildErrorResponse(HttpStatus.BAD_REQUEST, message);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorExceptionResponse> handleMissingParams(MissingServletRequestParameterException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Parametro mancante: " + ex.getParameterName());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorExceptionResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, "Violazione dell'integrità dei dati");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorExceptionResponse> handleAccessDenied(AccessDeniedException ex) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "Accesso negato");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorExceptionResponse> handleBadCredentials(BadCredentialsException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Credenziali non valide");
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorExceptionResponse> handleNoSuchElement(NoSuchElementException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Elemento non trovato");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorExceptionResponse> handleIllegalArgument(IllegalArgumentException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Argomento non valido: " + ex.getMessage());
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<ErrorExceptionResponse> handleAuthException(AuthException ex) {
       return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyRegisteredGeneralException.class)
    public ResponseEntity<ErrorExceptionResponse> handleUserAlreadyRegistered(UserAlreadyRegisteredGeneralException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(UserNotRegisteredGeneralException.class)
    public ResponseEntity<ErrorExceptionResponse> handleUserNotRegistered(UserNotRegisteredGeneralException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UniqueResourceAlreadyExistsGeneralException.class)
    public ResponseEntity<ErrorExceptionResponse> handleUniqueResourceAlreadyExists(UniqueResourceAlreadyExistsGeneralException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorExceptionResponse> handleAuthenticationException(AuthenticationException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorExceptionResponse> handleGenericException(Exception ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }


    /// build the response
    private ResponseEntity<ErrorExceptionResponse> buildErrorResponse(HttpStatus status, String message) {
        ErrorExceptionResponse response = new ErrorExceptionResponse(status, message);
        return new ResponseEntity<>(response, status);
    }
}