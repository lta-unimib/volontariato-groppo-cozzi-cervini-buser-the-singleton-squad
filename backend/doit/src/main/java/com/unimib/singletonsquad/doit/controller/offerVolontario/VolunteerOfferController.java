package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {

    private final UserVerify userVerify;
    private final VolunteerOfferService volunteerOfferService;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getOfferVolunteer(final HttpServletRequest request)  throws Exception{
        String volunteerEmail = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);


        return null;
    }
}
