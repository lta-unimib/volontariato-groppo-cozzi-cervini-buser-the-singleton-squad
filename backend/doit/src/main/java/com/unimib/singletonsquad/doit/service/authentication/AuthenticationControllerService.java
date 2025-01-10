package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.utils.FrontendUrls;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationControllerService {


    public String authenticate(HttpServletRequest req, String role, String authLink) throws IllegalArgumentException {
        if(!this.checkRole(role))
            return  FrontendUrls.BASE.getUrl()+"/?message=invalid_role";
        req.getSession().setAttribute("role", role);
        return authLink;
    }

    private boolean checkRole(String role){
        return UserVerify.checkUserRole(role);
    }

}
