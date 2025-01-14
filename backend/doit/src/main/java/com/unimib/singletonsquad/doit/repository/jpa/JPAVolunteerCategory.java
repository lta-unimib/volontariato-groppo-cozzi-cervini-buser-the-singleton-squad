package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.OrgCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerCategory extends JpaRepository<OrgCategory, Long> {
    boolean existsByName(String name);
}
