package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.service.register.RegisterOrganizationService;
import com.unimib.singletonsquad.doit.service.register.RegisterVolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration/")
public class RegisterController {

    @Autowired
    private RegisterVolunteerService registerService;
    @Autowired
    private RegisterOrganizationService registerOrganizationService;


    //oggetto DTP
    @PostMapping("/volunteer")
    public ResponseEntity<?> register(@RequestBody VolunteerDTO volunteer) {
        try{
            final String token = this.registerService.registerVolunteer(volunteer);
            return ResponseEntity.ok().body(token);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/organization")
    public ResponseEntity<?> registerOrganization(@RequestBody OrganizationDTO organization) {
        try{
            final String token= this.registerOrganizationService.registerOrganization(organization);
            return ResponseEntity.ok().body(token);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}
