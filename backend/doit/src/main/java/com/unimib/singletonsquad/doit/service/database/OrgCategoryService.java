package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.OrgCategory;
import com.unimib.singletonsquad.doit.exception.resource.UniqueResourceAlreadyExistsGeneralException;
import com.unimib.singletonsquad.doit.repository.jpa.JPAVolunteerCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrgCategoryService {
    @Autowired
    private JPAVolunteerCategory repository;

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
        System.out.println(orgCategories);
        for (String orgCategory : orgCategories) {
            addOrgCategory(orgCategory);
        }
    }

    public List<OrgCategory> getAllCategories() {
        return repository.findAll();
    }

    public List<String> getAllOrgCategories() {
        return repository.findAll().stream().map(OrgCategory::getName).collect(Collectors.toList());
    }
}
