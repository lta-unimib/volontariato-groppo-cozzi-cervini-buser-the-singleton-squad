package com.unimib.singletonsquad.doit.controller.authentication;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationRedirectSuccessService;
import jakarta.servlet.http.HttpServletRequest;;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/oauth/google/authentication")
public class AuthenticationRedirectController {

    //Template method
    @Autowired
    private AuthenticationRedirectSuccessService authenticationRedirectSuccessService;



    @GetMapping("/success")
    public String success(@RequestParam String role, @RequestParam String isRegistered,
                                    @RequestParam String uuid,
                                    HttpServletRequest request){
        System.out.println("ook ok ok ok ok ");

        this.authenticationRedirectSuccessService.handle(role,
                isRegistered, request, uuid);

        return "successAuth";
    }
    @GetMapping("/failure")
    public String failure(@RequestParam String message, Model model){
        model.addAttribute("message", message);
        return "failureAuth";
    }

}
