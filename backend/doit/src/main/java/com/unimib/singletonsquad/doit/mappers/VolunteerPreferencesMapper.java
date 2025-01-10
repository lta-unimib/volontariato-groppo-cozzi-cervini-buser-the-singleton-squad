package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.common.VolunteerCategories;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class VolunteerPreferencesMapper {

    public static VolunteerPreferences toVolunteerPreferences (SignInFormVolunteerDTO form) {
        VolunteerPreferences preferences = new VolunteerPreferences();
        preferences.setVolunteerCategories(createVolunteerCategoriesList(form.getPreferences()));
        preferences.setCity(form.getCity());
        preferences.setAvailability(toAvailability(form));
        return preferences;
    }

    public static Availability toAvailability(SignInFormVolunteerDTO form) {
        Availability availability = new Availability();
        availability.setData(form.getAvailability().getData());
        availability.setMode(form.getAvailability().getMode());

        return availability;
    }

    private static List<VolunteerCategories> createVolunteerCategoriesList(List<String> volunteerList) {
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
