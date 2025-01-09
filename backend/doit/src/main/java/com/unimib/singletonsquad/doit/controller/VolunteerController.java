package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/volontario")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping("/registrato")
    public ResponseEntity<Boolean> isRegistered(@RequestHeader("Authorization") String token) {
        try {
            System.out.println(token);
            return ResponseEntity.ok(volunteerService.isRegistered(1L));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
