package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAOrganizationRepository extends JpaRepository<Organization, Long>, IOrganizationRepository {
    //save, findById,
    @Override
    Organization findByName(String name);
    @Override
    boolean existsByEmail(String email);
}
