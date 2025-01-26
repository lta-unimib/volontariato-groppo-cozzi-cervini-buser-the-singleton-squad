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

    public void aggiornaMediaPesataOrganizzazione(Organization organization) throws IllegalAccessException {
        List<VolunteerRequest> volunteerRequests = this.volunteerRequestDatabaseService.getAllRequestOrganizationByEmail(organization.getEmail());
        double sommatoria1 = 0;
        int sommaPartecipanti = 0;
        for(VolunteerRequest volunteerRequest : volunteerRequests) {
            sommatoria1 = sommatoria1 + (volunteerRequest.getSommaVoti()/volunteerRequest.getTotalParticipants());
            sommaPartecipanti+=volunteerRequest.getTotalParticipants();
        }
        if(sommaPartecipanti == 0)
            throw new IllegalAccessException("Somma partecipanti non trovato --> serious problem");

        StatisticOrganization temp = organization.getStatisticOrganization();
        temp.setAverageVotes(sommatoria1/sommaPartecipanti);
        temp.setTotalFeedback(temp.getTotalFeedback()+1);
        temp.setTotalNumberOfParticipants(sommaPartecipanti);
        organization.setStatisticOrganization(temp);
        organizationDatabaseService.save(organization);
    }

    public StatisticOrganization getStatisticOrganization(String idOrganization) {
        Organization organization = organizationDatabaseService.findOrganizationByEmail(idOrganization);
        return organization.getStatisticOrganization();
    }

}
