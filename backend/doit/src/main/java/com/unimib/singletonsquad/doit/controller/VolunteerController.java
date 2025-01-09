package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/volunteer")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping("/registered")
    public ResponseEntity<Boolean> isRegistered(HttpServletRequest request) {
        try {
            String token = request.getSession().getAttribute("token").toString();
            String id = this.jwtUtils.extractUsername(token);
            System.out.println(id);
            String role = this.jwtUtils.extractClaimByName(token, "role").toString();
            System.out.println(role);
            if(role.equals("volontario")) {
                return ResponseEntity.ok(volunteerService.isRegistered(Long.parseLong(id)));
            }else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
