package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.*;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service("registerOrganizationService")
public class RegisterOrganizationService extends RegisterService {

    @Autowired
    private OrganizationService organizationService;


    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        System.out.println("checkUserForm Organization");
        if(form instanceof SignInFormOrganizationDTO){
            SignInFormOrganizationDTO signInFormOrganizationDTO = (SignInFormOrganizationDTO) form;
            try{
                Optional<Organization> org = this.organizationService.findOrganizationById(signInFormOrganizationDTO.getId());
                if(!org.isPresent())
                    throw new ResourceNotFoundException("org id not found", "ok");

                Organization organizationSaved = this.addOrganizationInfo(signInFormOrganizationDTO, org.get());
                this.organizationService.save(organizationSaved);

                /*
                Availability availability = this.createVolunteerAva(signInFormVolunteerDTO);
                this.availabilityService.save(availability);

                System.out.println("debug:" +vol.get());

                VolunteerPreferences preferences = this.createVolunteerPreferences(signInFormVolunteerDTO, availability);
                vol.get().setVolunteerPreferences(preferences);
                this.volunteerPreferencesService.save(preferences);
                //System.out.println(preferences.getAvailability());
                vol.get().setDescription(signInFormVolunteerDTO.getDescription());
                this.volunteerService.save(vol.get());
                 */


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
        OrganizationAddress address = addOrganizationAddress(form);
        organization.setDescription(form.getDescription());
        organization.setName(form.getName());
        organization.setPhoneNumber(null);
        organization.setSocialNetworks(null);
        organization.setVATNumber(form.getVATNumber());
        organization.setWeSite(form.getWebsite());
        organization.setOrganizationAddress(address);
        return organization;
    }
    private OrganizationAddress addOrganizationAddress(SignInFormOrganizationDTO form) {
        OrganizationAddress address = new OrganizationAddress();
        address.setCAP(form.getAddress().getPostalCode());
        address.setCountry(form.getAddress().getCountry());
        address.setCity(form.getAddress().getCity());
        return address;
    }
}
