package com.unimib.singletonsquad.doit.utils.common;

import com.unimib.singletonsquad.doit.utils.data.EmailValidator;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmailValidatorTest {
    @Test
    void testEmailValidation() {
        // Valid email addresses
        assertTrue(EmailValidator.isValidEmail("andreacozzi@campus.unimib.it"));
        assertTrue(EmailValidator.isValidEmail("andrea.cozzi@campus.unimib.it"));
        assertTrue(EmailValidator.isValidEmail("andrea-cozzi@unimib.it"));
        assertTrue(EmailValidator.isValidEmail("andrea_cozzi@studenti.unimib.it"));
        assertTrue(EmailValidator.isValidEmail("test@sub1.sub2.sub3.example.com"));
        assertTrue(EmailValidator.isValidEmail("user123@domain.co.uk"));

        // Invalid email addresses
        assertFalse(EmailValidator.isValidEmail(null));
        assertFalse(EmailValidator.isValidEmail(""));
        assertFalse(EmailValidator.isValidEmail(" "));
        assertFalse(EmailValidator.isValidEmail("invalidemail"));
        assertFalse(EmailValidator.isValidEmail("@domain.com"));
        assertFalse(EmailValidator.isValidEmail("user@"));
        assertFalse(EmailValidator.isValidEmail("user@.com"));
        assertFalse(EmailValidator.isValidEmail("user@domain"));
        assertFalse(EmailValidator.isValidEmail("user name@domain.com"));
        assertFalse(EmailValidator.isValidEmail("user@dom@ain.com"));

        // Test max length validation (254 characters)
        String longLocalPart = "a".repeat(200);
        String longEmail = longLocalPart + "@domain.com";
        assertTrue(EmailValidator.isValidEmail(longEmail));
    }
}