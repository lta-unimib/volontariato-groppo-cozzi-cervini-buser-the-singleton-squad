package com.unimib.singletonsquad.doit.database.organization;

import com.unimib.singletonsquad.doit.domain.organization.OrgCategory;
import com.unimib.singletonsquad.doit.exception.resource.UniqueResourceAlreadyExistsGeneralException;
import com.unimib.singletonsquad.doit.repository.jpa.JPAVolunteerCategory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrgCategoryService {
    private final JPAVolunteerCategory repository;

    public boolean isOrgCategoryExists(String name) {
        return repository.existsByName(name);
    }

    public void addOrgCategory(String orgCategory) {
        if(!isOrgCategoryExists(orgCategory)) {
            OrgCategory orgCategoryObj = new OrgCategory();
            orgCategoryObj.setName(orgCategory);
            repository.save(orgCategoryObj);
        }else {
            throw new UniqueResourceAlreadyExistsGeneralException("Category " + orgCategory + " already exists");
        }
    }

    public void addOrgCategories(List<String> orgCategories) {
       orgCategories.forEach(this::addOrgCategory);
    }

    public List<OrgCategory> getAllCategories() {
        return repository.findAll();
    }

    public List<String> getAllOrgCategories() {
        return repository.findAll().stream().map(OrgCategory::getName).collect(Collectors.toList());
    }
}
