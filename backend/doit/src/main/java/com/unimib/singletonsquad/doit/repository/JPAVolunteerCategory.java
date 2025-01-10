package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.OrgCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerCategory extends JpaRepository<OrgCategory, Long> {
    boolean existsByName(String name);
}
