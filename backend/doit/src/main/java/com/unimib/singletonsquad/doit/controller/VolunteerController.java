package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
@RestController
@RequestMapping("/volunteer")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping("/registered")
    public ResponseEntity<ResponseMessage> isRegistered(HttpServletRequest request) {
        try {
            String token = request.getSession().getAttribute("token").toString();
            String id = this.jwtUtils.extractUsername(token);
            String role = this.jwtUtils.extractClaimByName(token, "role").toString();

            if (role.equals("volontario")) {
                Boolean res = volunteerService.isRegistered(Long.parseLong(id));
                ResponseMessage responseMessage = ResponseMessageUtil.createSuccessResponse("Registration status", res.toString());
                return ResponseEntity.ok(responseMessage);
            } else {
                ResponseMessage responseMessage = ResponseMessageUtil.createErrorResponse("Unauthorized access", HttpStatus.UNAUTHORIZED.value());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
            }

        } catch (ExpiredJwtException e) {
            ResponseMessage responseMessage = ResponseMessageUtil.createErrorResponse("Token expired", HttpStatus.UNAUTHORIZED.value());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMessage);
        } catch (Exception e) {
            ResponseMessage responseMessage = ResponseMessageUtil.createErrorResponse("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }
}
*/