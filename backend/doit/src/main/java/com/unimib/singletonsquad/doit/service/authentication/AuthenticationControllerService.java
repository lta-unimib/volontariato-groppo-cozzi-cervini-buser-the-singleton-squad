package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import com.unimib.singletonsquad.doit.domain.common.VolunteerRequestStatus;
import com.unimib.singletonsquad.doit.utils.FrontendUrls;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationControllerService {

    @Autowired
    private AuthenticationResultService authenticationResultService;

    public String authenticate(HttpServletRequest req, String role, String uuid , String authLink) throws IllegalArgumentException {
        if(!this.checkRole(role))
            return  FrontendUrls.BASE.getUrl()+"/?message=invalid_role";
        req.getSession().setAttribute("role", role);
        req.getSession().setAttribute("uuid", uuid);

        //todo inserire che il UUID nel database
        AuthenticationResult authenticationResult = new AuthenticationResult();
        authenticationResult.setLoginId(uuid);
        authenticationResult.setStatus(VolunteerRequestStatus.PENDING);
        this.authenticationResultService.save(authenticationResult);

        return authLink;
    }

    private boolean checkRole(String role){
        return UserVerify.checkUserRole(role);
    }

}
