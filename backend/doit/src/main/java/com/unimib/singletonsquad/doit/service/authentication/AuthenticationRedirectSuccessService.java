package com.unimib.singletonsquad.doit.service.authentication;
import com.unimib.singletonsquad.doit.security.CustomOAuth2User;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationRedirectSuccessService extends AuthenticationRedirectService {


    private JWTUtils jwtUtils;

    public AuthenticationRedirectSuccessService() {
        this.jwtUtils = new JWTUtils();
    }

    @Override
    protected String doOperation(HttpServletRequest request, HttpServletResponse response, Model model) {
        CustomOAuth2User user = (CustomOAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userUUID = String.valueOf(user.getUserUniqueId());
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("role", request.getSession().getAttribute("role").toString());
        String token = this.jwtUtils.generateToken(userInfo, userUUID);
        user.setJwtToken(token);
        model.addAttribute("token", token);
        model.addAttribute("uuid", userUUID);
        return "successAuth";
    }
}
