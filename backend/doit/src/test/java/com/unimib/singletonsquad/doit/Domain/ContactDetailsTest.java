package com.unimib.singletonsquad.doit.Domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactDetailsTest {

    @Test
    void setPhoneNumber() {
        ContactDetails contactDetails = new ContactDetails("john.doe@example.com", "1234567890");
        contactDetails.setPhoneNumber("12345678900");
        assertEquals("1234567890", contactDetails.getPhoneNumber());
        contactDetails.setPhoneNumber("+23132131231");
        assertNotEquals("+23132131231", contactDetails.getPhoneNumber());
        contactDetails.setPhoneNumber("+391234567890");
        assertEquals("+391234567890", contactDetails.getPhoneNumber());
    }

    @Test
    void setEmail() {
        ContactDetails contactDetails = new ContactDetails("john.doe@example.com", "1234567890");
        contactDetails.setEmail("john.doe@example.com");
        assertEquals("john.doe@example.com", contactDetails.getEmail());
        contactDetails.setEmail("john.doe@example..com");
        assertNotEquals("john.doe@example..com", contactDetails.getEmail());
        contactDetails.setEmail("john.doeexample.com");
        assertNotEquals("john.doeexample.com", contactDetails.getEmail());
    }
}