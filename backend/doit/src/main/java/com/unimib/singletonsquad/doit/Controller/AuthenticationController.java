package com.unimib.singletonsquad.doit.Controller;
import com.unimib.singletonsquad.doit.Service.Authentication.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/authentication/{role}")
public class AuthenticationController {

    private static final String AUTH_REDIRECT = "redirect:/oauth2/authorization/google";
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }


    @GetMapping("/")
    public String authentication(@PathVariable String role, HttpServletRequest request, HttpServletResponse response) {
        try {
            return this.authenticationService.authenticate(request, response, role, AUTH_REDIRECT);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return null;
        }
    }
}