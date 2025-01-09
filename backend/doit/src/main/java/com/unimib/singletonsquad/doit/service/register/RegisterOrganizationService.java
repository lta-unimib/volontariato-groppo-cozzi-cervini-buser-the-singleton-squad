package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.*;
import com.unimib.singletonsquad.doit.dto.LocationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service("registerOrganizationService")
public class RegisterOrganizationService extends RegisterService {

    @Autowired
    private OrganizationService organizationService;


    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        System.out.println("checkUserForm Organization");
        if(form instanceof SignInFormOrganizationDTO signInFormOrganizationDTO){
            try{
                Optional<Organization> org = this.organizationService.findOrganizationById(signInFormOrganizationDTO.getId());
                if(org.isEmpty())
                    throw new ResourceNotFoundException("org id not found", "ok");

                Organization organizationSaved = this.addOrganizationInfo(signInFormOrganizationDTO, org.get());
                this.organizationService.save(organizationSaved);
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

    private Organization addOrganizationInfo(SignInFormOrganizationDTO form, Organization organization) {
        Location address = addOrganizationAddress(form);
        organization.setDescription(form.getDescription());
        organization.setName(form.getName());
        organization.setPhoneNumber(null);
        organization.setSocialNetworks(null);
        organization.setVATNumber(form.getVATNumber());
        organization.setWeSite(form.getWebsite());
        organization.setOrganizationAddress(address);
        return organization;
    }
    private Location addOrganizationAddress(SignInFormOrganizationDTO form) {
        Location address = new Location();
        LocationDTO locationDTO = form.getAddress();
        address.setPostalCode(locationDTO.getPostalCode());
        address.setCountry(locationDTO.getCountry());
        address.setCity(locationDTO.getCity());
        return address;
    }
}
