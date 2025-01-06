package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.dto.FormRegistrazioneDto;
import org.springframework.stereotype.Service;

//template method
@Service
public abstract class RegisterService {

    protected abstract void checkUserForm(final FormRegistrazioneDto form);
    protected abstract void registerUser();
    protected abstract void authenticateUser();

    public void registerUser(final FormRegistrazioneDto form) throws Exception {
        try{
            checkUserForm(form);
            registerUser();
            authenticateUser();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}
