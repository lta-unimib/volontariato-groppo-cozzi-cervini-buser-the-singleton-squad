package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.dto.Auth;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login/{role}")
public class AuthenticationController {

    @Autowired
    private AuthenticationUserService authenticationUserService;

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser( @PathVariable final String role,  @RequestBody final Auth auth) {
        try{
            System.out.println("Authenticating user with role: " + role);
            if(!UserVerify.checkUserRole(role))
                throw new Exception("Invalid user role");

            String email = auth.getEmail();
            String password = auth.getPassword();
            this.authenticationUserService.authenticate(password, role, email);

            ResponseMessage message = ResponseMessageUtil.createResponse("user is authenticated as " + role, HttpStatus.OK);
            return ResponseEntity.ok().body(message);
        }catch(Exception e){
           ResponseMessage message = ResponseMessageUtil.createResponse(e.getMessage(), HttpStatus.UNAUTHORIZED);
            return ResponseEntity.badRequest().body(message);
        }
    }





}
