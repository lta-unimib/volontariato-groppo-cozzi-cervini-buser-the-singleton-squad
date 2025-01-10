package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.controller.OrgCategoryController;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.mappers.VolunteerPreferencesMapper;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import com.unimib.singletonsquad.doit.service.database.AvailabilityService;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("registerVolunteerService")
public class RegisterVolunteerService  extends RegisterService {

    @Autowired
    private  VolunteerService volunteerService;
    @Autowired
    private  IVolunteerRepository volunteerRepository;
    @Autowired
    private VolunteerPreferencesService volunteerPreferencesService;
    @Autowired
    private AvailabilityService availabilityService;
    @Autowired
    private OrgCategoryController orgCategoryController;

    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        SignInFormVolunteerDTO volunteerFormDTO;
        System.out.println(form.getClass());
        try{
            if(form instanceof SignInFormVolunteerDTO) {
                volunteerFormDTO = (SignInFormVolunteerDTO) form;
                Optional<Volunteer> vol = volunteerService.findVolunteerById(volunteerFormDTO.getId());

                if (vol.isEmpty())
                    throw new ResourceNotFoundException("user id not found", "ok");

                Volunteer volunteer = vol.get();

                VolunteerPreferences preferences = VolunteerPreferencesMapper.toVolunteerPreferences(volunteerFormDTO);
                preferences.setCategories(createVolunteerCategoriesList(volunteerFormDTO.getPreferences()));
                availabilityService.save(preferences.getAvailability());
                volunteer.setVolunteerPreferences(preferences);
                this.volunteerPreferencesService.updatePreferences(preferences, volunteer.getId());
                volunteer.setDescription(volunteerFormDTO.getDescription());
                this.volunteerService.save(volunteer);
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    private List<String> createVolunteerCategoriesList(List<String> volunteerList) {
        List<String> categoriesList = new ArrayList<>();
        //TODO
        return categoriesList;
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
