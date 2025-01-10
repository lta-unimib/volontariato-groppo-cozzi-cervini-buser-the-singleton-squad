package com.unimib.singletonsquad.doit.service.register;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import com.unimib.singletonsquad.doit.dto.SingInFormDTO;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundException;
import com.unimib.singletonsquad.doit.mappers.VolunteerPreferencesMapper;
import com.unimib.singletonsquad.doit.service.database.AvailabilityService;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service("registerVolunteerService")
public class RegisterVolunteerService  extends RegisterService {

    @Autowired
    private  VolunteerService volunteerService;
    @Autowired
    private VolunteerPreferencesService volunteerPreferencesService;
    @Autowired
    private AvailabilityService availabilityService;

    @Override
    protected void checkUserForm(SingInFormDTO form) throws Exception {
        SignInFormVolunteerDTO volunteerFormDTO;
        try{
            if(form instanceof SignInFormVolunteerDTO) {
                volunteerFormDTO = (SignInFormVolunteerDTO) form;
                Optional<Volunteer> vol = volunteerService.findVolunteerById(volunteerFormDTO.getId());

                if (vol.isEmpty())
                    throw new ResourceNotFoundException("user id not found", "ok");

                Volunteer volunteer = vol.get();

                VolunteerPreferences preferences = VolunteerPreferencesMapper.toVolunteerPreferences(volunteerFormDTO);
                availabilityService.save(preferences.getAvailability());
                volunteer.setVolunteerPreferences(preferences);
                this.volunteerPreferencesService.save(preferences);
                volunteer.setDescription(volunteerFormDTO.getDescription());
                this.volunteerService.save(volunteer);
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
}
