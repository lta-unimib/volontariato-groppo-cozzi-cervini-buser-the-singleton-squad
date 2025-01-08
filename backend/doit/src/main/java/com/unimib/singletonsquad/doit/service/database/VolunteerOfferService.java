package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.repository.IVolunteerOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class VolunteerOfferService {
    @Autowired
    private IVolunteerOfferRepository volunteerOfferRepository;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private OrganizationService organizationService;

    public VolunteerOffer save(VolunteerOfferDTO volunteerOfferDTO) {
        VolunteerOffer volunteerOffer = new VolunteerOffer();
        volunteerOffer.setCompetenceDescription(volunteerOfferDTO.getVolunteerDescription());
        volunteerOffer.setVolunteer(volunteerService.findVolunteerById(volunteerOfferDTO.getVolunteerId()).get());
        volunteerOffer.setOrganization(organizationService.findOrganizationById(volunteerOfferDTO.getOrganizationId()).get());
        return volunteerOfferRepository.save(volunteerOffer);
    }
}
