package com.unimib.singletonsquad.doit.controller.authentication;
import com.fasterxml.jackson.databind.JsonNode;;
import com.unimib.singletonsquad.doit.dto.AuthDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/login/{role}")
public class AuthenticationController {

    private final AuthenticationUserService authenticationUserService;

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser( @PathVariable final String role,  @RequestBody final AuthDTO auth) throws Exception{
        if(!UserVerify.isValidRole(role))
            throw new InvalidRoleGeneralException("Invalid user role");

        String token = this.authenticationUserService.authenticate(auth, role);
        ResponseMessage message = this.createMessageResponse(role, token);
        return ResponseEntity.ok().body(message);
    }

    private ResponseMessage createMessageResponse( @PathVariable final String role, final String token){
        JsonNode tokenJson = ResponseMessageUtil.createJsonNode("authToken", token);
        String messageResponse = String.format("Successfully authenticated %s", role);
        return ResponseMessageUtil.createResponse( messageResponse, HttpStatus.OK, tokenJson);
    }
}
