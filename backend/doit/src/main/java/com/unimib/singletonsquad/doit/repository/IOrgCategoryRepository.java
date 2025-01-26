package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.organization.OrgCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrgCategoryRepository extends JpaRepository<OrgCategory, Long> {
}
