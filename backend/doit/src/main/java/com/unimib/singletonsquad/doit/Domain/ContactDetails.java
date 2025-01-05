package com.unimib.singletonsquad.doit.Domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

public class ContactDetails {
    private String email;
    private String phoneNumber;

    public ContactDetails(String email, String phoneNumber) {
        setEmail(email);
        setPhoneNumber(phoneNumber);
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        if(phoneNumber != null) {
            if(isValidItalianNumber(phoneNumber)) {
                this.phoneNumber = phoneNumber;
            }
        }else
            throw new NullPointerException("Phone number cannot be null");
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if(email != null) {
            if(isValidEmail(email)) {
                this.email = email;
            }
        }else throw new NullPointerException("Email cannot be null");
    }

    private boolean isValidEmail(String email) {
        String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[a-z]{2,})$";
        return email.matches(EMAIL_PATTERN);
    }

    private boolean isValidItalianNumber(String numero) {
        // Pattern for italian numbers +39XXXXXXXXX o XXXXXXXXX
        //"^\\+39\\d{10}$" prefix needed
        String pattern = "^(\\+39)?\\d{10}$";
        return numero.matches(pattern);
    }
}
