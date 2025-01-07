package com.unimib.singletonsquad.doit.controller;


import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.service.register.RegisterOrganizationService;
import com.unimib.singletonsquad.doit.service.register.RegisterService;
import com.unimib.singletonsquad.doit.service.register.RegisterVolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registrazione")
public class RegisterController {
    @Autowired
    @Qualifier("registerVolunteerService")
    private RegisterService registerVolunteerService;

    @Autowired
    @Qualifier("registerOrganizationService")
    private RegisterService registerOrganizationService;

    @Autowired
    private IVolunteerRepository volunteerRepository;

    @Autowired
    private IOrganizationRepository organizationRepository;

    @Autowired
    private VolunteerService volunteerService;

    @Autowired
    private VolunteerPreferencesService volunteerPreferencesService;

    @PostMapping("/volontario")
    public ResponseEntity<String> registrazioneVolontario(@RequestBody SignInFormVolunteerDTO volunteerDTO) {
        try{
            System.out.println("CONTROLLER REGISTRAZIONE DENTRO");
            //this.registerService.saveUser(volunteerDTO);
            this.registerVolunteerService.saveUser(volunteerDTO);
            return ResponseEntity.ok("Registrazione voltario");
        }catch(Exception e){
            System.out.println("CONTROLLER REGISTRAZIONE FUORI");
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/organizzazione")
    public ResponseEntity<String> registrazioneOrganizzazione(@PathVariable String role,
                                                          @RequestBody SignInFormOrganizationDTO organizationDTO) {
        try{
            this.registerOrganizationService = new RegisterOrganizationService();
            return ResponseEntity.ok("Registrazione voltario");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
