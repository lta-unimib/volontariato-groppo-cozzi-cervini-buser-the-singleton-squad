package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.exception.InvalidURIException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public abstract class AuthenticationRedirectService {


    //todo implementarlo come template method
    public String handleRedirect(HttpServletRequest request, HttpServletResponse  response, Model model, String next, Boolean exits){
        if(!this.checkURI(request)){
           return this.doOperation(request, response, model, exits, next);
        }
        return "failureAuth";
    }

    //step 2
    protected abstract String doOperation(HttpServletRequest request, HttpServletResponse  response, Model model, boolean exits, String next);

    //step 1
    protected boolean checkURI(HttpServletRequest request) {
        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

       /* String allowedOrigin = "http://localhost:8080";

        if (origin != null && !origin.equals(allowedOrigin)) {
            throw new InvalidURIException("Invalid Origin", request.getRequestURI());
        }
        if (referer != null && !referer.startsWith(allowedOrigin)) {
            throw new InvalidURIException("Invalid Referer", request.getRequestURI());
        }*/

        return false; // URI è valido
    }
}
