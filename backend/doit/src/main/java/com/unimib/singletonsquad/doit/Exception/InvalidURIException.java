package com.unimib.singletonsquad.doit.Exception;

public class InvalidURIException extends SecurityException {

    public InvalidURIException(String message, String path) {
        // Chiamata al costruttore della classe astratta SecurityException
        super(message, path);  // Passa sia il messaggio che il percorso
    }
}
