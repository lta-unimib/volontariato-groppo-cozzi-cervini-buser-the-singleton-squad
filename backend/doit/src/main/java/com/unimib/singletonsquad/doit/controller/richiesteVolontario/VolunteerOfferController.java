package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.exception.utils.ExceptionResponse;
import com.unimib.singletonsquad.doit.security.JWTUtils;
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

import java.util.Date;

@RestController
@RequestMapping("/offer")
public class VolunteerOfferController {
    @Autowired
    private VolunteerOfferService volunteerOfferService;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private UserVerify userVerify;

    @PostMapping("/new/")
    public ResponseEntity<?> createVolunteerRequest(final HttpServletRequest request,
                                                    final @RequestBody VolunteerOfferDTO volunteerOfferDTO) {
        try{
            this.checkUserRoleFromToken(request);
            this.volunteerOfferService.save(volunteerOfferDTO);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
        }catch(Exception e){
            ResponseMessage message = ResponseMessageUtil.createResponse(e.getMessage(), HttpStatus.BAD_REQUEST);
            return ResponseEntity.badRequest().body(message);
        }
    }

    private void checkUserRoleFromToken(final HttpServletRequest request) throws Exception{
        String token = this.jwtUtils.getTokenFromRequest(request);
        this.userVerify.checkUserRoleFromToken(token, String.valueOf(UserRole.volunteer));
    }
}
