package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.service.register.RegisterOrganizationService;
import com.unimib.singletonsquad.doit.service.register.RegisterVolunteerService;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/registration")
public class RegisterController {

    @Autowired
    private RegisterVolunteerService registerService;
    @Autowired
    private RegisterOrganizationService registerOrganizationService;

    @PostMapping(value = "/volunteer/", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerVolunteer(final @RequestBody VolunteerDTO volunteer) throws Exception {

            final String token = this.registerService.registerVolunteer(volunteer);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer registration success",
                    HttpStatus.OK, "{\"token\":\"" + token + "\"}");
            return ResponseEntity.ok().body(message);
    }

    @PostMapping(value = "/organization/", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerOrganization(@RequestBody OrganizationDTO organization) throws Exception {
            final String token= this.registerOrganizationService.registerOrganization(organization);

            Map<String, Object> tokenData = new HashMap<>();
            tokenData.put("token", token);
            ResponseMessage message = ResponseMessageUtil.createResponse("organization registration success",
                    HttpStatus.OK, tokenData);
            return ResponseEntity.ok().body(message);
    }
}
