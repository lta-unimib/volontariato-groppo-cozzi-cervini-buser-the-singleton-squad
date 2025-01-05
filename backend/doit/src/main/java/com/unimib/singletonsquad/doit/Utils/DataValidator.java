package com.unimib.singletonsquad.doit.Utils;

public class DataValidator {
    public static boolean isValidEmail(String email) {
        String EMAIL_PATTERN = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[a-z]{2,})$";
        return email.matches(EMAIL_PATTERN);
    }

    public static boolean isValidItalianNumber(String numero) {
        // Pattern for italian numbers +39XXXXXXXXX o XXXXXXXXX
        //"^\\+39\\d{10}$" prefix needed
        String pattern = "^(\\+39)?\\d{10}$";
        return numero.matches(pattern);
    }
}
