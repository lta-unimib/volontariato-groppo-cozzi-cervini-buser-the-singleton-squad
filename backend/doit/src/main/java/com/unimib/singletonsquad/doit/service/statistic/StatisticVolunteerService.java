package com.unimib.singletonsquad.doit.service.statistic;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StatisticVolunteerService {

    private VolunteerDatabaseService volunteerDatabaseService;


    public StatisticVolunteer getVolunteerStatistic(String email) {
        Volunteer volunteer = volunteerDatabaseService.findVolunteerByEmail(email);
        return volunteer.getStatistic();
    }


}
