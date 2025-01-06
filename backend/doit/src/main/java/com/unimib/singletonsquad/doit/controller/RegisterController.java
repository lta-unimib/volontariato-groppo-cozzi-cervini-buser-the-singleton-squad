package com.unimib.singletonsquad.doit.controller;


import com.unimib.singletonsquad.doit.dto.FormRegistrazioneOrganizzazioneDto;
import com.unimib.singletonsquad.doit.dto.FormRegistrazioneVolontarioDto;
import com.unimib.singletonsquad.doit.service.register.RegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registrazione/")
public class RegisterController {


    private RegisterService registerService;


    @PostMapping("/volontario")
    public ResponseEntity<String> registrazioneVolontario(@PathVariable String role,
                                        @RequestBody FormRegistrazioneVolontarioDto volontarioDto) {
        try{
            //this.registerService = new RegisterVolunteerService
            return ResponseEntity.ok("Registrazione voltario");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/organizzazione")
    public ResponseEntity<String> registrazioneOrganizzazione(@PathVariable String role,
                                                          @RequestBody FormRegistrazioneOrganizzazioneDto organizzazioneDto) {
        try{
            //this.registerService = new RegisterOrganizationService
            return ResponseEntity.ok("Registrazione voltario");
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
