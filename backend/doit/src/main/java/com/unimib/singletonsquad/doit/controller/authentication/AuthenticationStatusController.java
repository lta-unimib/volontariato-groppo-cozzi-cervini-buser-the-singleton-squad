package com.unimib.singletonsquad.doit.controller.authentication;

import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationStatusController {


    @GetMapping("/authentication/status/{uuid}")
    public ResponseEntity<ResponseMessage> authenticationStatus(@PathVariable String uuid) {
        try{

            ResponseMessage respose = new ResponseMessage.Builder("fail").status(400).build();
            return ResponseEntity.ok(respose);
        }catch (Exception e) {
            ResponseMessage respose = new ResponseMessage.Builder("fail").status(400).build();
            return ResponseEntity.status(400).body(respose);
        }
    }
}
