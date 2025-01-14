package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.exception.utils.ExceptionResponse;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerOfferService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PostMapping("/new/")
    public ResponseEntity<?> createVolunteerRequest(@RequestBody VolunteerOfferDTO volunteerOfferDTO) {
        try{
            System.out.println("POST volunteer offer: \n" + volunteerOfferDTO);
            //this.volunteerOfferService.save(volunteerOfferDTO);
            return ResponseEntity.ok().body("VolunteerOffer created successfully");
        }catch(Exception e){
                ExceptionResponse response = new ExceptionResponse(new Date(),
                    e.getMessage(), "not able to create a new offer", 500);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
