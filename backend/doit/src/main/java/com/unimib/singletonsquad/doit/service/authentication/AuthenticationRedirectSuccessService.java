package com.unimib.singletonsquad.doit.service.authentication;
import com.unimib.singletonsquad.doit.security.CustomOAuth2User;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationRedirectSuccessService extends AuthenticationRedirectService {

    @Autowired
    private JWTUtils jwtUtils;
    private String userRole = null;

    @Override
    protected String doOperation(HttpServletRequest request, HttpServletResponse response, Model model, boolean exists, String next) {
        System.out.println(next);
        System.out.println(URLDecoder.decode(next));
        String[] attributes = this.setUserJwtToken(request);
        model.addAttribute("token", attributes[0]);
        model.addAttribute("userId", attributes[1]);
        model.addAttribute("role", attributes[2]);
        model.addAttribute("actionUrl", URLDecoder.decode(next));
        return "successAuth";
    }

    private String[] setUserJwtToken(HttpServletRequest request) {
        CustomOAuth2User user = (CustomOAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, Object> userInfo = new HashMap<>();
        String role = request.getSession().getAttribute("role").toString();
        userInfo.put("role", role);
        Long principalId = ((CustomOAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserUniqueId();
        String token = this.jwtUtils.generateToken(userInfo, principalId.toString());
        user.setJwtToken(token);
        String redirectUrl = (role.equalsIgnoreCase("volunteer")) ? "volunteer" : "organization";
        return new String[]{token, principalId.toString(), role, redirectUrl};
    }
}
