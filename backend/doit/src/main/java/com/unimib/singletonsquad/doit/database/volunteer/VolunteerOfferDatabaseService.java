package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.IVolunteerOfferRepository;
import lombok.AllArgsConstructor;
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

    public VolunteerOffer getVolunteerOffer(final Long id) throws Exception {
        Optional<VolunteerOffer> optional = this.volunteerOfferRepository.findById(id);
        if (optional.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer offer not found");
        return optional.get();
    }


    public void deleteVolunteerOffer(VolunteerOffer offer) throws Exception {
        volunteerOfferRepository.delete(offer);
    }


}
