package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationControllerService {


    public String authenticate(HttpServletRequest req, HttpServletResponse res, String role, String authLink) throws IOException {
        if(!this.checkRole(role))
            ResponseUtils.sendJsonResponse(res, HttpServletResponse.SC_BAD_REQUEST, "role: not valid");
        req.getSession().setAttribute("role", role);
        return authLink;
    }

    private boolean checkRole(String role){
        return (role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("organization"));
    }


}
