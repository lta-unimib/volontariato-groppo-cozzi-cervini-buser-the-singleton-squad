package com.unimib.singletonsquad.doit.Controller;

import com.unimib.singletonsquad.doit.Service.AuthenticationRedirectErrorService;
import com.unimib.singletonsquad.doit.Service.AuthenticationRedirectService;
import com.unimib.singletonsquad.doit.Service.AuthenticationRedirectSuccessService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/oauth/google/authentication")
public class AuthenticationRedirectController {

    //Template method
    private final AuthenticationRedirectService authenticationRedirectSuccessService;
    private final AuthenticationRedirectService authenticationRedirectErrorService;

    public AuthenticationRedirectController(AuthenticationRedirectSuccessService authenticationRedirectSuccessService,
                                            AuthenticationRedirectErrorService authenticationRedirectErrorService) {
        this.authenticationRedirectSuccessService = authenticationRedirectSuccessService;
        this.authenticationRedirectErrorService = authenticationRedirectErrorService;
    }

    @GetMapping("/success")
        public String success(HttpServletRequest request, HttpServletResponse response, Model model) {
        return this.authenticationRedirectSuccessService.handleRedirect(request, response, model);
    }

    @GetMapping("/error")
    public String error(HttpServletRequest request, HttpServletResponse response, Model model) {
        return this.authenticationRedirectErrorService.handleRedirect(request, response, model);
    }
}
