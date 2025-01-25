package com.unimib.singletonsquad.doit.controller.authentication;
import com.fasterxml.jackson.databind.JsonNode;
import com.unimib.singletonsquad.doit.dto.received.AuthDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/login")
public class AuthenticationController {

    private final AuthenticationUserService authenticationUserService;

    @PostMapping(value = "/{role}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> authenticateVolunteer(@RequestBody final AuthDTO auth, @PathVariable("role") String role) throws InvalidRoleGeneralException{
        if(!RegisteredUserService.isValidRole(role))
            throw new InvalidRoleGeneralException("Invalid role");
        String token = this.authenticationUserService.authenticate(auth, role);
        return this.createMessageResponse(String.valueOf(UserRole.ORGANIZATION), token);
    }

    private ResponseEntity<ResponseMessage> createMessageResponse( @PathVariable final String role, final String token){
        JsonNode tokenJson = ResponseMessageUtil.createJsonNode("authToken", token);
        String messageResponse = String.format("Successfully authenticated %s", role);
        return ResponseMessageUtil.createResponseSuccess(messageResponse, HttpStatus.OK, tokenJson);
    }
}
