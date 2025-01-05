package com.unimib.singletonsquad.doit.Service.Authentication;

import com.unimib.singletonsquad.doit.Exception.InvalidURIException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
public abstract class AuthenticationRedirectService {


    //todo implementarlo come template method
    public String handleRedirect(HttpServletRequest request, HttpServletResponse  response, Model model){
        if(!this.checkURI(request)){
           return this.doOperation(request, response, model);
        }
        return "failureAuth";
    }

    //step 2
    protected abstract String doOperation(HttpServletRequest request, HttpServletResponse  response, Model model);

    //step 1
    protected boolean checkURI(HttpServletRequest request) {
        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        String allowedOrigin = "http://localhost:8080";

        if (origin != null && !origin.equals(allowedOrigin)) {
            throw new InvalidURIException("Invalid Origin", request.getRequestURI());
        }
        if (referer != null && !referer.startsWith(allowedOrigin)) {
            throw new InvalidURIException("Invalid Referer", request.getRequestURI());
        }

        return false; // URI è valido
    }
}
