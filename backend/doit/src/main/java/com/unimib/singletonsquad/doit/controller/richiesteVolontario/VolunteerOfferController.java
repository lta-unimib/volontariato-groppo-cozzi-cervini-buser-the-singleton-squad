package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.exception.utils.ExceptionResponse;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.database.VolunteerOfferService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/offerte")
public class VolunteerOfferController {
    @Autowired
    private VolunteerOfferService volunteerOfferService;
    @Autowired
    private JWTUtils jwtUtils;
    @PostMapping("/nuova")
    public ResponseEntity<?> createVolunteerRequest(@RequestBody VolunteerOfferDTO volunteerOfferDTO) {
        try{
            //endpoint chiamato dall'organizzazione
            System.out.println("POST volunteer offer: \n" + volunteerOfferDTO);
            this.volunteerOfferService.save(volunteerOfferDTO);
            return ResponseEntity.ok().body("VolunteerOffer created successfully");
        }catch(Exception e){
                ExceptionResponse response = new ExceptionResponse(new Date(),
                    e.getMessage(), "not able to create a new offer", 500);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllVolunteerRequest(HttpServletRequest request) {
        try{
            //endpoint chiamato dal volontario
            //algoritmo di matching
            //Sono alcune operazioni di test
            String token = request.getSession().getAttribute("token").toString();
            System.out.println(token);
            System.out.println(this.jwtUtils.extractUsername(token));
            System.out.println(this.jwtUtils.extractClaimByName(token, "role"));
            //.getName() --> ID utente
            System.out.println(SecurityContextHolder.getContext().getAuthentication());
            return ResponseEntity.ok("ok");

        }catch (Exception e){
            ExceptionResponse response = new ExceptionResponse(new Date(),
                    e.getMessage(), "not able to create a new offer", 500);
            return ResponseEntity.badRequest().body(response);
        }
    }


}
