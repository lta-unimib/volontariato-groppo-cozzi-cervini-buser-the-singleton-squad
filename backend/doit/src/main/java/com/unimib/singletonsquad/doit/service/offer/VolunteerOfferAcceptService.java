package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class VolunteerOfferAcceptService {

    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;


    public void acceptVolunteerOffer(Long idOffer, String organizationEmail) throws Exception {


    }

    private void checkVolunteerOffer(Long idOffer, String organizationEmail) throws Exception {
        Optional<VolunteerOffer> volunteerOfferOptional = volunteerOfferDatabaseService.getVolunteerOffer(idOffer);
        if(volunteerOfferOptional.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer offer not found");
        VolunteerOffer volunteerOffer  = volunteerOfferOptional.get();

        checkOrganizationEmail(organizationEmail, volunteerOffer);
        checkRequestCapacity(volunteerOffer);
        VolunteerRequest temp = this.volunteerRequestDatabaseService.decreaseCapacity(volunteerOffer.getVolunteerRequest());
        changeStatusAndSave(volunteerOffer, temp);

    }
    //todo aggiungerlo nel controladvisor
    private void checkOrganizationEmail(String organizationEmail, VolunteerOffer volunteer) throws Exception {
        if(!volunteer.getOrganization().getEmail().equals(organizationEmail))
            throw new IllegalAccessException("Organization email not match");
    }

    private void checkRequestCapacity(VolunteerOffer volunteerOffer) throws Exception {
        if (volunteerOffer.getVolunteerRequest().getCapacity() <=0)
            throw new RecordNotFoundGeneralException("Volunteer request capacity 0");
    }

    private void changeStatusAndSave(VolunteerOffer volunteerOffer, VolunteerRequest volunteerRequest) throws Exception {
        volunteerOffer.setVolunteerRequest(volunteerRequest);
        volunteerOffer.setStatus(Status.ACCEPTED);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
    }



}
