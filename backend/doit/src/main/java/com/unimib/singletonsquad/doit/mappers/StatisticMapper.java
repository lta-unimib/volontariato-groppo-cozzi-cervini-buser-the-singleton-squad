package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.organization.StatisticOrganization;
import com.unimib.singletonsquad.doit.domain.volunteer.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;

public class StatisticMapper {

    private StatisticMapper() {}

    public static StatisticVolunteer createStatisticVolunteer(Volunteer volunteer) {
        StatisticVolunteer temp = new StatisticVolunteer();
        temp.setAverageVotes(0.0);
        temp.setTotalFeedback(0);
        temp.setVolunteer(volunteer);
        return temp;
    }

    public static StatisticOrganization createStaticOrganization(Organization organization) {
        StatisticOrganization temp = new StatisticOrganization();
        temp.setOrganization(organization);
        temp.setNumeroTotalePartecipanti(0);
        temp.setAverageVotes(0.0);
        return temp;
    }
}
