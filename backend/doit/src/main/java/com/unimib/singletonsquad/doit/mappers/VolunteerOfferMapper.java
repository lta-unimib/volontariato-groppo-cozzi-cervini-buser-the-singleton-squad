package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;

import java.util.ArrayList;
import java.util.List;

public class VolunteerOfferMapper {

    private VolunteerOfferMapper() {}

    /// Create an Offer
    public static VolunteerOffer createAnOffer(Volunteer volunteer, VolunteerRequest volunteerRequest) {
        VolunteerOffer volunteerOffer = new VolunteerOffer();
        volunteerOffer.setVolunteer(volunteer);
        volunteerOffer.setVolunteerRequest(volunteerRequest);
        volunteerOffer.setStatus(Status.ACCEPTED);
        volunteerOffer.setVotedByOrganization(false);
        volunteerOffer.setVotedByVolunteer(false);
        return volunteerOffer;
    }

    public static VolunteerOfferDTO toOfferDTO(VolunteerOffer volunteerOffer) {
        VolunteerOfferDTO dto = new VolunteerOfferDTO();
        dto.setVolunteerRequestId(volunteerOffer.getVolunteerRequest().getId());
        return dto;
    }


    public static List<VolunteerOfferDTO> getListVolunteerOfferDTO(List<VolunteerOffer> volunteerOfferList) {
        List<VolunteerOfferDTO> volunteerOfferDTOS = new ArrayList<>();
        for (VolunteerOffer v : volunteerOfferList) {
            volunteerOfferDTOS.add(toOfferDTO(v));
        }
        return volunteerOfferDTOS;
    }

}
