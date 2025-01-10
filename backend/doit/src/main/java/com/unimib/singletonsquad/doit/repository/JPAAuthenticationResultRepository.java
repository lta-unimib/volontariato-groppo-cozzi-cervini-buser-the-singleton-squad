package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAAuthenticationResultRepository extends JpaRepository<AuthenticationResult, Long> {
}
