package com.unimib.singletonsquad.doit.utils.data;

import java.util.regex.Pattern;
public class EmailValidator {

    private EmailValidator(){}
    private static final int MAX_EMAIL_LENGTH = 254; // RFC 5321
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-z0-9._%+-]+@[a-z0-9-]+(\\.[a-z0-9-]+)*\\.[a-z]{2,}$",
            Pattern.CASE_INSENSITIVE
    );

    public static boolean isValidEmail(String email) {
        if (email == null || email.length() >= MAX_EMAIL_LENGTH) {
            return false;
        }

        String sanitizedEmail = email.trim().toLowerCase();
        if (sanitizedEmail.isEmpty()) {
            return false;
        }

        return EMAIL_PATTERN.matcher(sanitizedEmail).matches();
    }
}