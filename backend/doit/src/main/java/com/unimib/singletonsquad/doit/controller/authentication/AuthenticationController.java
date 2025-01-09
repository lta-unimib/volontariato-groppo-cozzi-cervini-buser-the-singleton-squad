package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationControllerService;
import com.unimib.singletonsquad.doit.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/authentication/{role}")
public class AuthenticationController {

    private static final String AUTH_REDIRECT = "/oauth2/authorization/google";

    @Autowired
    private AuthenticationControllerService authenticationControllerService;

    @GetMapping("/")
    public RedirectView authentication(@PathVariable String role, HttpServletRequest request) {
            String redirect= this.authenticationControllerService.authenticate(request, role, AUTH_REDIRECT);
            return new RedirectView(redirect);
    }
}