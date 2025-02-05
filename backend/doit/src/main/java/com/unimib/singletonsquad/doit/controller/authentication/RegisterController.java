package com.unimib.singletonsquad.doit.controller.authentication;

import com.fasterxml.jackson.databind.JsonNode;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.received.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.resource.InvalidDTOParameterGeneral;
import com.unimib.singletonsquad.doit.service.registration.RegistrationOrganizationService;
import com.unimib.singletonsquad.doit.service.registration.RegistrationVolunteerService;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@AllArgsConstructor
public class RegisterController {

    private final RegistrationVolunteerService registerVolunteerService;
    private final RegistrationOrganizationService registerOrganizationService;

    @PostMapping(value = "/volunteer/", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> registerVolunteer(@Valid @RequestBody VolunteerDTO volunteer) throws InvalidDTOParameterGeneral {
        return register(volunteer);
    }

    @PostMapping(value = "/organization/", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> registerOrganization(@Valid @RequestBody OrganizationDTO organization) throws InvalidDTOParameterGeneral{
        return register(organization);
    }

    private String registerEntity(Object dto) throws InvalidDTOParameterGeneral{
        if (dto instanceof VolunteerDTO volunteer) {
            return registerVolunteerService.registerVolunteer(volunteer);
        } else if (dto instanceof OrganizationDTO organization) {
            return registerOrganizationService.registerOrganization(organization);
        } else {
            throw new InvalidDTOParameterGeneral(HttpStatus.PRECONDITION_FAILED, "Unsupported DTO type");
        }
    }

    private ResponseEntity<ResponseMessage> register(Object dto) throws InvalidDTOParameterGeneral{
        String token = registerEntity(dto);
        JsonNode tokenJson = ResponseMessageUtil.createJsonNode("authToken", token);
        return  ResponseMessageUtil.createResponseSuccess("Registration successful", HttpStatus.OK, tokenJson);
    }


}
