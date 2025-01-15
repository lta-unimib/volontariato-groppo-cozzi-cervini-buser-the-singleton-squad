package com.unimib.singletonsquad.doit.controller;
/*
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.utils.UserRole;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/registered")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private UserVerify userVerify;

    @GetMapping("/volunteer/")
    public ResponseEntity<?> isRegistered(HttpServletRequest request) {
        try {
            this.userVerify.checkUserRoleFromToken(request, String.valueOf(UserRole.organization));
        } catch (Exception e) {

        }

    }


}*/