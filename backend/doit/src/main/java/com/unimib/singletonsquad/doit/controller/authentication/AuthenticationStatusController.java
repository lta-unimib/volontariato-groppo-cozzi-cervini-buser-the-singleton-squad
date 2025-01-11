package com.unimib.singletonsquad.doit.controller.authentication;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import com.unimib.singletonsquad.doit.domain.common.AuthenticationStatus;
import com.unimib.singletonsquad.doit.dto.AuthenticationResultDTO;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationResultService;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthenticationStatusController {


    @Autowired
    private AuthenticationResultService authenticationResultService;


    @GetMapping("/authentication/status/{uuid}")
    public ResponseEntity<ResponseMessage> authenticationStatus(@PathVariable String uuid) {
        try{
            System.out.println(uuid);
            ResponseMessage message = this.getRecordAuth(uuid);
            return ResponseEntity.ok(message);
        }catch (Exception e) {
            ResponseMessage respose = new ResponseMessage.Builder("fail").status(400).build();
            return ResponseEntity.status(400).body(respose);
        }
    }

    private ResponseMessage getRecordAuth(String uuid) throws Exception {
        Optional<AuthenticationResult> res = this.authenticationResultService.findByLoginId(uuid);
        if(!res.isPresent())
            throw new Exception("auth not found");
        AuthenticationResult authenticationResult = res.get();
        System.out.println("debug:::::"+authenticationResult);

        String token = authenticationResult.getToken();
        String userId = authenticationResult.getUserdId();
        String role = authenticationResult.getRole();
        Boolean isRegister = authenticationResult.isRegistered();
        authenticationResult.setStatus(AuthenticationStatus.DONE);
        String url = this.getCorrectLink(role, isRegister);

        AuthenticationResultDTO body = new AuthenticationResultDTO();
        body.setUserId(userId);
        body.setAuthToken(token);
        body.setRedirectPath(url);


        ResponseMessage respose = new ResponseMessage.Builder("success").status(200).data(body).build();
        return respose;
    }

    private String getCorrectLink(String role, Boolean isRegister) {
        switch (role) {
            case "volunteer":
                if(isRegister)
                    return "/dashboard/volunteer/";
                else
                    return "/form/volunteer/";
            case "organization":
                if(isRegister)
                    return "/dashboard/organization/";
                else
                    return "/form/organization/";

        default:
            return null;

        }

    }


}
