package com.unimib.singletonsquad.doit.utils.data;

import java.util.regex.Pattern;

public class EmailValidator {

    private EmailValidator() {}

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$"
    );

    public static boolean isValidEmail(String email) {
        if (email == null || email.length() < 5 || email.length() > 100)
            return false;
        return EMAIL_PATTERN.matcher(email).matches();
    }
}

