package com.unimib.singletonsquad.doit.exception.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

@Getter
@Setter
public class AuthException extends AuthenticationException {

    private HttpStatus httpStatus;


    public AuthException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

}
