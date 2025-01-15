package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerOfferService;
import com.unimib.singletonsquad.doit.utils.UserRole;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/offer")
public class VolunteerOfferController {
    @Autowired
    private VolunteerOfferService volunteerOfferService;
    @Autowired
    private UserVerify userVerify;

    @PostMapping("/new/")
    public ResponseEntity<?> createVolunteerRequest(final HttpServletRequest request,
                                                    final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            this.userVerify.checkUserRoleFromToken(request, String.valueOf(UserRole.volunteer));
            this.volunteerOfferService.save(volunteerOfferDTO);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);

    }

}
