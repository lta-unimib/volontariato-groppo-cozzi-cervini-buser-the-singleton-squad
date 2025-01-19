package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IOrganizationRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAOrganizationRepository extends JpaRepository<Organization, Long>, IOrganizationRepository {
    //save, findById,
    @Override
    Organization findByName(String name);
    @Override
    boolean existsByEmail(String email);
}
