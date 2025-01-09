package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/organization")
public class OrganizationController {

    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private OrganizationService organizationService;


    @GetMapping("/registered")
    public ResponseEntity<Boolean> registeredOrganization(HttpServletRequest request) {
        try{
            String token = this.jwtUtils.getTokenFromRequest(request);
            if(token == null) throw new Exception();
            if(!this.jwtUtils.verifyToken(token)) throw new Exception();
            String role[] = new String[]{this.jwtUtils.extractUsername(token), this.jwtUtils.extractClaimByName(token, "role").toString()};
            if(role[1].equalsIgnoreCase("organization")) throw new Exception();
            return ResponseEntity.ok(this.organizationService.isRegistered(Long.parseLong(role[0])));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
