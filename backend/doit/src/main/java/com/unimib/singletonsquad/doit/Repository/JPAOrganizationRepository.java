package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Organization;
import com.unimib.singletonsquad.doit.Domain.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JPAOrganizationRepository extends JpaRepository<Organization, Long>, IOrganizationRepository {
    //save, findById,
    @Override
    Organization findByName(String name);
    @Override
    boolean existsByEmail(String email);
}
