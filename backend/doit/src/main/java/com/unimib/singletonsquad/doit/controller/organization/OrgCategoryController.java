package com.unimib.singletonsquad.doit.controller.organization;
import com.unimib.singletonsquad.doit.database.organization.OrganizationCategoryDatabaseService;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/categories")
public class OrgCategoryController {
    private OrganizationCategoryDatabaseService orgCategoryService;

    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAll() {
        ResponseMessage responseMessage;
        List<String> categories = orgCategoryService.getAllOrgCategories() != null ? orgCategoryService.getAllOrgCategories() : new ArrayList<>();
        responseMessage = new ResponseMessage.Builder("categories").data(categories).build();
        return ResponseEntity.ok(responseMessage);
    }
}
