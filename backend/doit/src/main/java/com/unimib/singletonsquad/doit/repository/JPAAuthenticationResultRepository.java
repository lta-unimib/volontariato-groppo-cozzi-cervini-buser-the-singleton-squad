package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.AuthenticationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface JPAAuthenticationResultRepository extends JpaRepository<AuthenticationResult, Long> {
    Optional<AuthenticationResult> findByLoginId(String loginId);
}
