package com.unimib.singletonsquad.doit.service.statistic;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.StatisticOrganization;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StatisticOrganizationService {

    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;

    public void aggiornaMediaPesataOrganizzazione(Organization organization) {
        List<VolunteerRequest> volunteerRequests = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(organization.getEmail());
        double sommatoria1 = 0;
        int sommaPartecipanti = 0;
        for(VolunteerRequest volunteerRequest : volunteerRequests) {
            sommatoria1 = sommatoria1 + (volunteerRequest.getSommaVoti()/volunteerRequest.getTotalParticipants());
            sommaPartecipanti+=volunteerRequest.getTotalParticipants();
        }

        StatisticOrganization temp = organization.getStatisticOrganization();
        temp.setMediPesata(sommatoria1/sommaPartecipanti);
        organization.setStatisticOrganization(temp);
        organizationDatabaseService.save(organization);
    }

}
