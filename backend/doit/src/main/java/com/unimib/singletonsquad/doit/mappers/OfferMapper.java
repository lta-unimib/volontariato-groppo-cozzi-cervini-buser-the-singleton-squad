package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;

public class OfferMapper {
    public static VolunteerOffer toOffer(VolunteerOfferDTO volunteerOfferDTO, Organization organization, Volunteer volunteer, VolunteerRequest volunteerRequest) {
        VolunteerOffer volunteerOffer = new VolunteerOffer();
        volunteerOffer.setVolunteer(volunteer);
        volunteerOffer.setOrganization(organization);
        volunteerOffer.setVolunteerRequest(volunteerRequest);
        volunteerOffer.setStatus(Status.PENDING);
        volunteerOffer.setCompetenceDescription(volunteerOfferDTO.getVolunteerDescription());
        return volunteerOffer;
    }
}
