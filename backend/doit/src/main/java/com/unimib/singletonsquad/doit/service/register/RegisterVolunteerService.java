package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.Availability;
import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.domain.VolunteerCategories;
import com.unimib.singletonsquad.doit.domain.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import com.unimib.singletonsquad.doit.service.database.AvailabilityService;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

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

    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        SignInFormVolunteerDTO signInFormVolunteerDTO;
        System.out.println(form.getClass());
        try{
            if(form instanceof SignInFormVolunteerDTO) {
                System.out.println("ok");
                signInFormVolunteerDTO = (SignInFormVolunteerDTO) form;

                Optional<Volunteer> vol = this.volunteerService.findVolunteerById(signInFormVolunteerDTO.getId());
                if (vol.isEmpty())
                    throw new ResourceNotFoundException("user id not found", "ok");
                Availability availability = this.createVolunteerAva(signInFormVolunteerDTO);
                this.availabilityService.save(availability);

                System.out.println("debug:" +vol.get());

                VolunteerPreferences preferences = this.createVolunteerPreferences(signInFormVolunteerDTO, availability);
                vol.get().setVolunteerPreferences(preferences);
                this.volunteerPreferencesService.save(preferences);
                //System.out.println(preferences.getAvailability());
                vol.get().setDescription(signInFormVolunteerDTO.getDescription());
                this.volunteerService.save(vol.get());
            }
        }catch (Exception e){
            throw new Exception(e.getMessage());
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

    private VolunteerPreferences createVolunteerPreferences(SignInFormVolunteerDTO form, Availability availability) {
        VolunteerPreferences preferences = new VolunteerPreferences();
        preferences.setVolunteerCategories(createVolunteerCategoriesList(form.getPreferences()));
        preferences.setCity(form.getCity());
        preferences.setAvailability(availability);
        return preferences;
    }
    private Availability createVolunteerAva(SignInFormVolunteerDTO form) {
        Availability ava = new Availability();
        ava.setData(form.getAvailability().getData());
        ava.setMode(form.getAvailability().getMode());
        return ava;
    }

    private List<VolunteerCategories> createVolunteerCategoriesList(List<String> volunteerList) {
        List<VolunteerCategories> categoriesList = new ArrayList<>();
        for(String str : volunteerList){
            try {
                VolunteerCategories category = VolunteerCategories.valueOf(str);
                categoriesList.add(category);
            }catch (Exception e){
                throw new RuntimeException(e);
            }
        }
        return categoriesList;
    }
}
