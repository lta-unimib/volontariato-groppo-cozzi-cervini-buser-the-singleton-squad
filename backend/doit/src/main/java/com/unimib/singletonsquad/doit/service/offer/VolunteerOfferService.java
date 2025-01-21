package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.common.CheckUserIsRegisteredDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerOfferService {

    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final CheckUserIsRegisteredDatabaseService checkUserIsRegisteredDatabaseService;


    public List<VolunteerOffer> getAllVolunteerOffers(final String email) throws Exception {
        this.checkUserIsRegisteredDatabaseService.checkUserIsRegistered(email, UserRole.volunteer);
        return this.volunteerOfferDatabaseService.getAllVolunteerOffers(email);
    }
}
