package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Organization;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface IOrganizationRepository {
    Organization save(Organization organization);
    Optional<Organization> findById(Long id);
    Organization findByName(String name);
    boolean existsByName(String name);
    boolean existsById(Long id);
    boolean existsByEmail(String email);
    Optional<Organization> findByEmail(String email);
}
