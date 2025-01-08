package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.domain.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/richieste")
public class VolunteerRequestController {
    @Autowired
    private VolunteerRequestService volunteerRequestService;

    @PostMapping("/nuova")
    public ResponseEntity<String> createVolunteerRequest(@RequestBody VolunteerRequestDTO volunteerRequestDTO) {
        System.out.println("POST volunteer request: \n" + volunteerRequestDTO);
        this.volunteerRequestService.save(volunteerRequestDTO);
        return ResponseEntity.ok().body("VolunteerRequest created successfully");
    }
}
