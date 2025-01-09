package com.unimib.singletonsquad.doit.service.authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
public class AuthenticationRedirectErrorService extends AuthenticationRedirectService {

    @Override
    protected String doOperation(HttpServletRequest request, HttpServletResponse response, Model model, boolean exits, String next) {
        try{
            System.out.println(next);
            String error = URLDecoder.decode(request.getParameter("message"), "UTF-8");
            model.addAttribute("error", error);
            model.addAttribute("next", URLDecoder.decode(next, "UTF-8"));
            return "errorAuth";
        }catch(UnsupportedEncodingException e){
            e.printStackTrace();
            model.addAttribute("error", e.getMessage());
            model.addAttribute("next", null);
            return "errorAuth";
        }
    }
}
