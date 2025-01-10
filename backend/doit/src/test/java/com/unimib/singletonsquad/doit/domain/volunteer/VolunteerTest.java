package com.unimib.singletonsquad.doit.domain.volunteer;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class VolunteerTest {

    private Volunteer volunteer;

    @BeforeEach
    void setUp() {
        volunteer = new Volunteer(1L, "Mario", "Rossi", "mario.rossi@example.com");
    }

    @Test
    void setPhoneNumber() throws Exception {
        String validPhoneNumber = "+391234567890";
        volunteer.setPhoneNumber(validPhoneNumber);
        assertEquals(validPhoneNumber, volunteer.getPhoneNumber());

        validPhoneNumber = "1234567890";
        volunteer.setPhoneNumber(validPhoneNumber);
        assertEquals(validPhoneNumber, volunteer.getPhoneNumber());
    }
}