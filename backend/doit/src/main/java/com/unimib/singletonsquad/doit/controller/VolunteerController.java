package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/volontario")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private JWTUtils jwtUtils;

    @GetMapping("/registrato")
    public ResponseEntity<Boolean> isRegistered(HttpServletRequest request) {
        try {
            System.out.println("isRegistered");
            String token = request.getSession().getAttribute("token").toString();
            String id = this.jwtUtils.extractUsername(token);
            System.out.println(id);
            //String role = request.getSession().getAttribute("role").toString();
            //System.out.println(role);
            //System.out.println(id);
            if(true) {
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
