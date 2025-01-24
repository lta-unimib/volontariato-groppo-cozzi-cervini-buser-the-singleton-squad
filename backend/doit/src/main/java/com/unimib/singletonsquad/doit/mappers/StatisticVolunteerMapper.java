package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.common.StatisticVolunteer;
public class StatisticVolunteerMapper {

    private StatisticVolunteerMapper() {}

    protected StatisticVolunteer createStatisticVolunteer() {
        StatisticVolunteer temp = new StatisticVolunteer();
        temp.setAverageVotes(0.0);
        temp.setTotalVotes(0);
        return temp;
    };
}
