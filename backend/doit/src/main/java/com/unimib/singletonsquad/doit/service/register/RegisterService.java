package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.dto.SignInFormDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import org.springframework.stereotype.Service;

//template method
@Service
public abstract class RegisterService {

    protected abstract void checkUserForm(final SignInFormVolunteerDTO form);
    protected abstract void registerUser();
    protected abstract void authenticateUser();

    public void registerUser(final SignInFormVolunteerDTO form) throws Exception {
        try{
            checkUserForm(form);
            registerUser();
            authenticateUser();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
