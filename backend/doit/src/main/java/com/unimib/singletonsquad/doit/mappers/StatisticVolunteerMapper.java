package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.common.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;

public class StatisticVolunteerMapper {

    private StatisticVolunteerMapper() {}

    public static StatisticVolunteer createStatisticVolunteer(Volunteer volunteer) {
        StatisticVolunteer temp = new StatisticVolunteer();
        temp.setAverageVotes(0.0);
        temp.setTotalVotes(0);
        temp.setVolunteer(volunteer);
        return temp;
    };
}
