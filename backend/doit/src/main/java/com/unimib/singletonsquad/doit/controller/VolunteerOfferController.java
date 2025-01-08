package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerOfferService;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offerte")
public class VolunteerOfferController {
    @Autowired
    private VolunteerOfferService volunteerOfferService;

    @PostMapping("/nuova")
    public ResponseEntity<String> createVolunteerRequest(@RequestBody VolunteerOfferDTO volunteerOfferDTO) {
        System.out.println("POST volunteer offer: \n" + volunteerOfferDTO);
        this.volunteerOfferService.save(volunteerOfferDTO);
        return ResponseEntity.ok().body("VolunteerOffer created successfully");
    }
}
