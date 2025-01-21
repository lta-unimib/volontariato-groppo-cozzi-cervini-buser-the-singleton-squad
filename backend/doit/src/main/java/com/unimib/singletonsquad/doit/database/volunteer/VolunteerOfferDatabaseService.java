package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.repository.IVolunteerOfferRepository;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Optional<VolunteerOffer> getVolunteerOffer(final Long id) throws Exception {
        return this.volunteerOfferRepository.findById(id);
    }

}
