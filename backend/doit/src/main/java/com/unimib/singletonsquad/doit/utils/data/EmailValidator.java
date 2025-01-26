package com.unimib.singletonsquad.doit.utils.data;

import java.util.regex.Pattern;

public class EmailValidator {

    private EmailValidator() {}

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\\.[A-Za-z]{2,})+$",
            Pattern.CASE_INSENSITIVE
    );
    public static boolean isValidEmail(String email) {
        if (email == null || email.length() < 5 || email.length() > 100)
            return false;
        return EMAIL_PATTERN.matcher(email).matches();
    }
}

