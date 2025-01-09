package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.utils.ResponseUtils;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@Component
public class AuthenticationControllerService {


    public String authenticate(HttpServletRequest req, String role, String authLink) throws IllegalArgumentException {
        if(!this.checkRole(role))
            return ResponseUtils.frontendUrlBase+"/error?message=invalid_role";
        req.getSession().setAttribute("role", role);
        return authLink;
    }

    private boolean checkRole(String role){
        return UserVerify.checkUserRole(role);
    }


}
