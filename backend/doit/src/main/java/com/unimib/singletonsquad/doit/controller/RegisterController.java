package com.unimib.singletonsquad.doit.controller;


import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.service.register.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registrazione/{role}")
public class RegisterController {
    private RegisterService registerService;
    /*@Autowired
    RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }*/

    //@PostMapping("/volontario")
    public ResponseEntity<String> registrazioneVolontario(@PathVariable String role,
                                        @RequestBody SignInFormVolunteerDTO volunteerDTO) {
        try{
            System.out.println("CONTROLLER REGISTRAZIONE DENTRO");
            System.out.println(volunteerDTO);
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
            //this.registerService = new RegisterOrganizationService
            return ResponseEntity.ok("Registrazione voltario");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
