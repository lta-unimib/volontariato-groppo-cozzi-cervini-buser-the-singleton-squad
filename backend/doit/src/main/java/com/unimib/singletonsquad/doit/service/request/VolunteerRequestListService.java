package com.unimib.singletonsquad.doit.service.request;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.ShortVolunteerDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.serializer.VolunteerRequestSerializer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class VolunteerRequestListService {

    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;


    public Object getRequestList(Organization organization) {
        Map<VolunteerRequest, List<Volunteer>> requestMap = this.volunteerRequestDatabaseService.getRequestListAllEvents(organization);
        return VolunteerRequestSerializer.serializeVolunteerRequests(requestMap);
    }

    public List<ShortVolunteerDTO> getRequestListSpecific(Organization organization, Long eventId) {
        checkCorrectEventId(organization, eventId);
        return this.volunteerRequestDatabaseService.getRequestSpecificiListAllEvents(eventId);
    }

    private void checkCorrectEventId(Organization organization, Long eventId) {
        VolunteerRequest temp = this.volunteerRequestDatabaseService.getSpecificRequest(eventId);
        if (!temp.getOrganization().getEmail().equals(organization.getEmail())) {
            throw new RecordNotFoundGeneralException("The request does not belong to this organization");
        }
    }


}
