package com.unimib.singletonsquad.doit.service.authentication;

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
@Service
public class AuthenticationRedirectSuccessService {

    @Autowired
    private JWTUtils jwtUtils;

    public void handle(String role, String isRegistered, HttpServletRequest request, Model model) {
        // Codifica dei parametri
        String encodedRole = URLEncoder.encode(role, StandardCharsets.UTF_8);
        String encodedIsRegistered = URLEncoder.encode(isRegistered.toString(), StandardCharsets.UTF_8);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        String userId = request.getSession().getAttribute("user_id").toString();
        String token = this.jwtUtils.generateToken(claims, userId);
        model
                .addAttribute("isRegistered", encodedIsRegistered)
                .addAttribute("authToken", token)
                .addAttribute("userId", userId)
                .addAttribute("role", encodedRole);
    }
}