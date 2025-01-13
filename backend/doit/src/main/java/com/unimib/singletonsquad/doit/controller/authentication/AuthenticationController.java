package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/{role}")
public class AuthenticationController {

    @Autowired
    private AuthenticationUserService authenticationUserService;

    @PostMapping("")
    public ResponseEntity<?> authenticateOrganization(
            @PathVariable final String role,
            @NotNull final String email,
            @NotNull final String password) {
        try{
            this.checkRole(role);
            this.authenticationUserService.authenticate(password, role, email);
            return ResponseEntity.ok().body("user is authenticated");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }
    }
    private void checkRole(@NotNull final String role) {
        if(!(role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("student")))
            throw  new IllegalArgumentException("Invalid role");

    }


}
