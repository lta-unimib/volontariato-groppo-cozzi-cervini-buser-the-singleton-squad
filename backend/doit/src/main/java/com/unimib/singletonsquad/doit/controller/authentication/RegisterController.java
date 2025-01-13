package com.unimib.singletonsquad.doit.controller.authentication;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.service.register.RegisterVolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration/")
public class RegisterController {

    //Servizi
    @Autowired
    private RegisterVolunteerService registerService;


    //oggetto DTP
    @PostMapping("/volunteer")
    public ResponseEntity<?> register(@RequestBody VolunteerDTO volunteer) {
        try{
            final String token = this.registerService.registerVolunteer(volunteer);
            return ResponseEntity.ok().body(token);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }
    }

    @PostMapping("/organization")
    public ResponseEntity<?> registerOrganization(@PathVariable String role) {
        try{
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getStackTrace());
        }
    }




}
