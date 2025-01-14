package com.unimib.singletonsquad.doit.utils;

public class UserVerify {

    public static boolean checkUserRole(String role) {
        return (role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("organization"));
    }
}
