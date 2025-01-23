package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;

public class OfferMapper {
    public static VolunteerOffer toOffer(VolunteerOfferDTO volunteerOfferDTO, Volunteer volunteer, VolunteerRequest volunteerRequest) {
        VolunteerOffer volunteerOffer = new VolunteerOffer();
        volunteerOffer.setVolunteer(volunteer);
        volunteerOffer.setVolunteerRequest(volunteerRequest);
        volunteerOffer.setStatus(Status.PENDING);
        volunteerOffer.setVoted(false);
        return volunteerOffer;
    }

    /// DI CAMBIARLO E FARLO IN UNA CLASSE SPECIFICA
    public static VolunteerOfferDTO toOfferDTO(VolunteerOffer volunteerOffer) {
        VolunteerOfferDTO dto = new VolunteerOfferDTO();
        dto.setVolunteerRequestId(volunteerOffer.getVolunteerRequest().getId());
        return dto;
    }
}
