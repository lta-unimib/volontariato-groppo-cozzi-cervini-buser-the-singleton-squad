package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationRedirectSuccessService {

    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationResultService authenticationResultService;


    public void handle(String role,
                       String isRegistered,
                       HttpServletRequest request,
                       String uuid) {
        // Codifica dei parametri
        String encodedRole = URLEncoder.encode(role, StandardCharsets.UTF_8);
        String encodedIsRegistered = URLEncoder.encode(isRegistered.toString(), StandardCharsets.UTF_8);

        System.out.println(encodedRole + " " + encodedIsRegistered+" "+uuid);


        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        String userId = null;
        try{
         userId = request.getSession().getAttribute("user_id").toString();}
        catch(Exception e){
            e.getStackTrace();
        }
        System.out.println("user_id:"+userId);
        String token = this.jwtUtils.generateToken(claims, userId);
        this.getAuthenticationResult(role, uuid, userId, Boolean.valueOf(isRegistered), token);


    }
    //todo che generale la risposta oggetto
    private void getAuthenticationResult(String role, String uuid, String userId, Boolean isRegistered, String authToken) {
        Optional<AuthenticationResult> res = this.authenticationResultService.findByLoginId(uuid);
        System.out.println("debug::"+res);

        System.out.println("ok ok ok ok ");

        AuthenticationResult authenticationResult = res.get();
        authenticationResult.setRole(role);
        authenticationResult.setUserdId(userId);
        authenticationResult.setToken(authToken);
        authenticationResult.setRegistered(isRegistered);
        this.authenticationResultService.save(authenticationResult);
    }
}