package com.unimib.singletonsquad.doit.exception.resource;

import com.unimib.singletonsquad.doit.exception.security.CustomSecurityException;

public class InvalidURIException extends CustomSecurityException {

    public InvalidURIException(String message, String path) {
        // Chiamata al costruttore della classe astratta SecurityException
        super(message, path);  // Passa sia il messaggio che il percorso
    }
}
