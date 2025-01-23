package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.InvalidDateException;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class VolunteerOfferAcceptService {

    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    public void acceptVolunteerOffer(Long idOffer, String organizationEmail) throws Exception {
        VolunteerOffer volunteerOffer  = volunteerOfferDatabaseService.getVolunteerOffer(idOffer);
        checkStartDateAndEndDate(volunteerOffer.getVolunteerRequest());
        checkOrganizationEmail(organizationEmail, volunteerOffer);
        checkRequestCapacity(volunteerOffer);
        VolunteerRequest temp = this.volunteerRequestDatabaseService.decreaseCapacity(volunteerOffer.getVolunteerRequest());
        changeStatusAndSave(volunteerOffer, temp);
    }


    /// === SUPPORT ORGANIZATION ====

    private void checkOrganizationEmail(String organizationEmail, VolunteerOffer volunteer) throws IllegalAccessException {
        if(!volunteer.getOrganization().getEmail().equals(organizationEmail))
            throw new IllegalAccessException("Organization email not match");
    }

    private void checkRequestCapacity(VolunteerOffer volunteerOffer) throws RecordNotFoundGeneralException {
        if (volunteerOffer.getVolunteerRequest().getCapacity() <=0)
            throw new RecordNotFoundGeneralException("Volunteer request capacity 0");
    }

    private void checkStartDateAndEndDate(VolunteerRequest volunteerRequest) throws InvalidDateException {
        LocalDateTime endDate = volunteerRequest.getEndDateTime();
        LocalDateTime now = LocalDateTime.now();

        if (!now.isBefore(endDate))
            throw new InvalidDateException(HttpStatus.BAD_REQUEST,"Non è possibile accettare la richiesta in quanto è scaduta");
    }

    private void changeStatusAndSave(VolunteerOffer volunteerOffer, VolunteerRequest volunteerRequest) throws Exception {
        volunteerOffer.setVolunteerRequest(volunteerRequest);
        volunteerOffer.setStatus(Status.ACCEPTED);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
    }



}
