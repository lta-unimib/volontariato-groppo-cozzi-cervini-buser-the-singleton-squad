package com.unimib.singletonsquad.doit.controller.organization;
import com.unimib.singletonsquad.doit.service.database.organization.OrgCategoryService;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class OrgCategoryController {
    @Autowired
    private OrgCategoryService orgCategoryService;

    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAll() {
        ResponseMessage responseMessage;
        List<String> categories = orgCategoryService.getAllOrgCategories() != null ? orgCategoryService.getAllOrgCategories() : new ArrayList<>();
        responseMessage = new ResponseMessage.Builder(categories.toString()).build();
        return ResponseEntity.ok(responseMessage);
    }
}
