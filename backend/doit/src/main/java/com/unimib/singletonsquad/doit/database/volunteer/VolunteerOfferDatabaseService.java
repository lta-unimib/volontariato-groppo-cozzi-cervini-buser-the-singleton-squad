package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.repository.IVolunteerOfferRepository;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class VolunteerOfferDatabaseService {
    private final IVolunteerOfferRepository volunteerOfferRepository;

    public void saveVolunteerOffer(VolunteerOffer v) throws Exception {
        this.volunteerOfferRepository.save(v);
    }

    public List<VolunteerOffer> getAllVolunteerOffers(final String email) {
        return this.volunteerOfferRepository.getAllOffer(email);
    }
}
