package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.Availability;
import com.unimib.singletonsquad.doit.domain.VolunteerCategories;
import com.unimib.singletonsquad.doit.domain.VolunteerPreferences;
import com.unimib.singletonsquad.doit.dto.SignInFormVolunteerDTO;

import java.util.ArrayList;
import java.util.List;

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
