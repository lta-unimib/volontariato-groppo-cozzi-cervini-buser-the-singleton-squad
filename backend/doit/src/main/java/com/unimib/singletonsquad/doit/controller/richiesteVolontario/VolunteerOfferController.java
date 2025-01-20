package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferDatabaseService volunteerOfferService;
    private final UserVerify userVerify;

    @PostMapping("/new/")
    public ResponseEntity<?> createVolunteerRequest(final HttpServletRequest request,
                                                    final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            String email = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);
            this.volunteerOfferService.save(volunteerOfferDTO);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);

    }

}
