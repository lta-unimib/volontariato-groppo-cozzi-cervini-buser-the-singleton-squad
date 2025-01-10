package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.database.OrgCategoryService;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service("registerOrganizationService")
public class RegisterOrganizationService extends RegisterService {

    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private OrgCategoryService orgCategoryService;

    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        System.out.println("checkUserForm Organization");
        if(form instanceof SignInFormOrganizationDTO signInFormDTO){
            try{
                Optional<Organization> org = organizationService.findOrganizationById(signInFormDTO.getId());

                if(org.isEmpty())
                    throw new ResourceNotFoundException("org id not found", "ok");
                Organization organization = OrganizationMapper.organizationInfo(signInFormDTO, org.get());
                System.out.println(organization);
                orgCategoryService.addOrgCategories(organization.getCategories());
                this.organizationService.save(organization);
            }catch (Exception e){
                throw new Exception(e.getMessage());
            }
        }

    }

    @Override
    protected void authenticateUser(SingInFormDTO form) {

    }

    @Override
    protected void sanitizeUserInputs(SingInFormDTO form) {
        //  this.formInputs.setDescription(super.sanitizeString(form.getDescription()));
        //  this.formInputs.setCity(super.sanitizeString(form.getCity()));

    }
}
