package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import com.unimib.singletonsquad.doit.repository.JPAAuthenticationResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationResultService {
    @Autowired
    JPAAuthenticationResultRepository repository;

    public void save(AuthenticationResult authenticationResult) {
        repository.save(authenticationResult);
    }
}
