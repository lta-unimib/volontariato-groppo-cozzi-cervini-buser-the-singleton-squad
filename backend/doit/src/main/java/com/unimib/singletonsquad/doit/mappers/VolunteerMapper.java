package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.ProfilePicture;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class VolunteerMapper {

    public Volunteer mapToVolunteer(Map<String, Object> userAttributes) throws Exception {
        Volunteer volunteer = new Volunteer();
        ProfilePicture profilePicture = new ProfilePicture();
        volunteer.setName((String) userAttributes.get("given_name"));
        volunteer.setSurname((String) userAttributes.get("family_name"));
        volunteer.setEmail((String) userAttributes.get("email"));
        profilePicture.setUrl((String) userAttributes.get("picture"));
        volunteer.setPhoneNumber((String) userAttributes.get("phoneNumber"));
        volunteer.setRegistered(false);
        volunteer.setDescription(null);
        volunteer.setProfilePicture(profilePicture);
        return volunteer;
    }
}
