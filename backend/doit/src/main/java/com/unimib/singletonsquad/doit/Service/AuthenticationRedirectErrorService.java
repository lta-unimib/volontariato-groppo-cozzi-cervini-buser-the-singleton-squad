package com.unimib.singletonsquad.doit.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
public class AuthenticationRedirectErrorService extends AuthenticationRedirectService {
    @Override
    protected String doOperation(HttpServletRequest request, HttpServletResponse response, Model model) {
        try{
            String error = URLDecoder.decode(request.getParameter("message"), "UTF-8");
            model.addAttribute("error", error);
            return "errorAuth";
        }catch(UnsupportedEncodingException e){
            e.printStackTrace();
            model.addAttribute("error", e.getMessage());
            return "errorAuth";
        }
    }
}
