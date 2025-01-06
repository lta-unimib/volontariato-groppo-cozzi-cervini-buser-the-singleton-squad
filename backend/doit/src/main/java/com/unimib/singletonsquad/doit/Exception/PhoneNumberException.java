package com.unimib.singletonsquad.doit.Exception;

import java.util.zip.DataFormatException;

public class PhoneNumberException extends IllegalArgumentException {
    public PhoneNumberException(String message) {
        super(message);
    }
}
