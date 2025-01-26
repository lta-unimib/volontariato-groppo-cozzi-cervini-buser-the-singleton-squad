package com.unimib.singletonsquad.doit.controller.richiesteVolontario;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.send.ShortVolunteerInfoDTO;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestListService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/request/volunteer/list")
@AllArgsConstructor
public class VolunteerRequestVolunteerListController {

    private final RegisteredUserService registeredUserService;
    private final VolunteerRequestListService volunteerRequestListService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getListVolunteerRequestVolunteerList(final HttpServletRequest request) {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);
        Object res = this.volunteerRequestListService.getRequestList(organization);
        return ResponseMessageUtil.createResponseSuccess("get", HttpStatus.OK, res);
    }

    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getListVolunteerRequestVolunteerListByIdRequest(final HttpServletRequest request, final @PathVariable("idRequest") Long idRequest) {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);
        List<ShortVolunteerInfoDTO> res = this.volunteerRequestListService.getRequestListSpecific(organization, idRequest);

        return ResponseMessageUtil.createResponseSuccess("get", HttpStatus.OK, res);
    }
}
