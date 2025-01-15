package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.OfferMapper;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class VolunteerOfferService {
    @Autowired
    private IVolunteerOfferRepository volunteerOfferRepository;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private VolunteerRequestService volunteerRequestService;

    public VolunteerOffer save(VolunteerOfferDTO volunteerOfferDTO) throws Exception {
        VolunteerOffer volunteerOffer;
        Optional<Volunteer> volunteer = volunteerService.findVolunteerById(volunteerOfferDTO.getVolunteerId());
        Optional<VolunteerRequest> volunteerRequest = volunteerRequestService.findRequestById(volunteerOfferDTO.getVolunteerRequestId()) ;
        Optional<Organization> organization = organizationService.findOrganizationById(volunteerOfferDTO.getOrganizationId());

        if(organization.isEmpty()) {
            throw new RecordNotFoundGeneralException("Organization not found");
        }else if(volunteer.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        } else if(volunteerRequest.isEmpty()){
            throw new RecordNotFoundGeneralException("VolunteerRequest not found");
        }else{
            volunteerOffer = OfferMapper.toOffer(volunteerOfferDTO, organization.get(), volunteer.get(), volunteerRequest.get());
        }

        return volunteerOfferRepository.save(volunteerOffer);
    }
}
