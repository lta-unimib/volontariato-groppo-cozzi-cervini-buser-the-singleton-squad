package com.unimib.singletonsquad.doit.controller.registration;


import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.service.register.RegisterService;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
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
    public ResponseEntity<ResponseMessage> registerVolunteer(@RequestBody SignInFormVolunteerDTO volunteerDTO) {
        try{
            this.registerVolunteerService.saveUser(volunteerDTO);
            ResponseMessage responseMessage = new ResponseMessage.Builder("Volunteer correctly registered").build();
            return ResponseEntity.ok(responseMessage);
        }catch(Exception e){
            ResponseMessage responseMessage = new ResponseMessage.Builder(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseMessage);
        }
    }

    @PostMapping("/organization")
    public ResponseEntity<ResponseMessage> registerOrganization(@RequestBody SignInFormOrganizationDTO organizationDTO) {
        try{
            this.registerOrganizationService.saveUser(organizationDTO);
            ResponseMessage responseMessage = new ResponseMessage.Builder("Organization correctly registered").build();
            return ResponseEntity.ok(responseMessage);
        }catch(Exception e){
            ResponseMessage responseMessage = new ResponseMessage.Builder(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseMessage);
        }
    }
}