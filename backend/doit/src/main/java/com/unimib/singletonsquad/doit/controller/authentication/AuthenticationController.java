package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.dto.Auth;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login/{role}")
public class AuthenticationController {

    @Autowired
    private AuthenticationUserService authenticationUserService;

    @PostMapping("/")
    public ResponseEntity<?> authenticateUser(
            @PathVariable final String role,
           @RequestBody final Auth auth) {
        try{
            System.out.println("Authenticating user with role: " + role);
            this.checkRole(role);
            String email = auth.getEmail();
            String password = auth.getPassword();
            System.out.println("email: " + email);
            System.out.println("password: " + password);

            this.authenticationUserService.authenticate(password, role, email);
            return ResponseEntity.ok().body("user is authenticated");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private void checkRole(@NotNull final String role) {
        if(!(role.equalsIgnoreCase("volunteer") || role.equalsIgnoreCase("organization")))
            throw  new IllegalArgumentException("Invalid role");
    }


}
