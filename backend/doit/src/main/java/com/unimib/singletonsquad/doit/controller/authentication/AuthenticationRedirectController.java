package com.unimib.singletonsquad.doit.controller.authentication;

import com.unimib.singletonsquad.doit.service.authentication.AuthenticationRedirectService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URLDecoder;

@Controller
@RequestMapping("/oauth/google/authentication")
public class AuthenticationRedirectController {

    //Template method
    @Autowired
    private AuthenticationRedirectService authenticationRedirectSuccessService;
    @Autowired
    private AuthenticationRedirectService authenticationRedirectErrorService;



    @GetMapping("/success")
        public String success(HttpServletRequest request,
                              HttpServletResponse response,
                              Model model,
                              @RequestParam  String next,
                              @RequestParam  Boolean exists) {
        System.out.println(next);
        System.out.println(exists);
        return this.authenticationRedirectSuccessService.handleRedirect(request, response, model, next, exists);
    }

    @GetMapping("/error")
    public String error(HttpServletRequest request,
                        HttpServletResponse response, Model model,
                        @RequestParam  String next,
                        @RequestParam  Boolean exists) {
        return this.authenticationRedirectErrorService.handleRedirect(request, response, model, next, exists);
    }
    @GetMapping("/failure")
    public String failure(HttpServletRequest request,
                          HttpServletResponse response,
                          Model model,
                          @RequestParam  String next,
                          @RequestParam  Boolean exists) {
        model.addAttribute("next", URLDecoder.decode(next));
        return "failureAuth";
    }
}
