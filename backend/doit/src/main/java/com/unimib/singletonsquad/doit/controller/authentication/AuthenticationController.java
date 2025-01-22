package com.unimib.singletonsquad.doit.controller.authentication;
import com.fasterxml.jackson.databind.JsonNode;;
import com.unimib.singletonsquad.doit.dto.recived.AuthDTO;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
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

    @PostMapping(value = "/volunteer/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> authenticateVolunteer(@RequestBody final AuthDTO auth) throws Exception{
        String token = this.authenticationUserService.authenticate(auth, String.valueOf(UserRole.volunteer));
        ResponseMessage message = this.createMessageResponse(String.valueOf(UserRole.organization), token);
        return ResponseEntity.ok().body(message);

    }

    @PostMapping(value = "/organization/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> authenticateOrganization(@RequestBody final AuthDTO auth) throws Exception{
        String token = this.authenticationUserService.authenticate(auth, String.valueOf(UserRole.organization));
        ResponseMessage message = this.createMessageResponse(String.valueOf(UserRole.organization), token);
        return ResponseEntity.ok().body(message);
    }



    private ResponseMessage createMessageResponse( @PathVariable final String role, final String token){
        JsonNode tokenJson = ResponseMessageUtil.createJsonNode("authToken", token);
        String messageResponse = String.format("Successfully authenticated %s", role);
        return ResponseMessageUtil.createResponse( messageResponse, HttpStatus.OK, tokenJson);
    }
}
