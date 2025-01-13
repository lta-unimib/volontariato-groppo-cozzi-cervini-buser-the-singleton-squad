package com.unimib.singletonsquad.doit.controller.authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {


    @PostMapping("/organization")
    public ResponseEntity<?> authenticateOrganization() {
        try{
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }
    }

    @PostMapping("/volunteer")
    public ResponseEntity<?> authenticateVolunteer() {
        try{
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }
    }

}
