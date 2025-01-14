package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerOfferRepository;
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
        if(volunteerService.findVolunteerById(volunteerOfferDTO.getVolunteerId()).isPresent()){
            volunteerOffer.setVolunteer(volunteerService.findVolunteerById(volunteerOfferDTO.getVolunteerId()).get());
        }
        if(organizationService.findOrganizationById(volunteerOfferDTO.getOrganizationId()).isPresent()) {
            volunteerOffer.setOrganization(organizationService.findOrganizationById(volunteerOfferDTO.getOrganizationId()).get());
        }

        return volunteerOfferRepository.save(volunteerOffer);
    }
}
