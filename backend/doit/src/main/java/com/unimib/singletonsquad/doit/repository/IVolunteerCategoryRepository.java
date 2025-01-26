package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.organization.OrgCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVolunteerCategoryRepository extends JpaRepository<OrgCategory, Long> {
    boolean existsByName(String name);
}
