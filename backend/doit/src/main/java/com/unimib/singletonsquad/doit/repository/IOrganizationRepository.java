package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface IOrganizationRepository extends JpaRepository<Organization, Long> {
    Organization findByName(String name);
    boolean existsByEmail(String email);
    Optional<Organization> findByEmail(String email);
}
