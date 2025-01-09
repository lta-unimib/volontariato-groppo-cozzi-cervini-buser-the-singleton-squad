package com.unimib.singletonsquad.doit.controller.register;


import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.service.register.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    @Qualifier("registerVolunteerService")
    private RegisterService registerVolunteerService;

    @Autowired
    @Qualifier("registerOrganizationService")
    private RegisterService registerOrganizationService;


    @PostMapping("/volunteer")
    public ResponseEntity<String> registrazioneVolontario(@RequestBody SignInFormVolunteerDTO volunteerDTO) {
        try{
            this.registerVolunteerService.saveUser(volunteerDTO);
            return ResponseEntity.ok("Volunteer correctly registered");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/organization")
    public ResponseEntity<String> registrazioneOrganizzazione(@RequestBody SignInFormOrganizationDTO organizationDTO) {
        try{
            this.registerOrganizationService.saveUser(organizationDTO);
            return ResponseEntity.ok("Organization correctly registered");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
