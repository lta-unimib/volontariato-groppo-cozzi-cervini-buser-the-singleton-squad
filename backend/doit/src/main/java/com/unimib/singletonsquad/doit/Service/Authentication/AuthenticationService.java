package com.unimib.singletonsquad.doit.Service.Authentication;

import com.unimib.singletonsquad.doit.Utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthenticationService {


    public String authenticate(HttpServletRequest req, HttpServletResponse res, String role, String authLink) throws IOException {
        if(!this.checkRole(role))
            ResponseUtils.sendJsonResponse(res, HttpServletResponse.SC_BAD_REQUEST, "role: not valid");
        req.getSession().setAttribute("role", role);
        return authLink;
    }

    private boolean checkRole(String role){
        return (role.equalsIgnoreCase("volontario") || role.equalsIgnoreCase("organizzazione"));
    }


}
