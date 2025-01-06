package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Organization;
import com.unimib.singletonsquad.doit.Domain.Volunteer;

import java.util.Optional;

public interface IOrganizationRepository {
    Organization save(Organization organization);
    Optional<Organization> findById(Long id);
    Organization findByName(String name);
    boolean existsByName(String name);
    boolean existsById(Long id);
    boolean existsByEmail(String email);
    Optional<Organization> findByEmail(String email);
}
