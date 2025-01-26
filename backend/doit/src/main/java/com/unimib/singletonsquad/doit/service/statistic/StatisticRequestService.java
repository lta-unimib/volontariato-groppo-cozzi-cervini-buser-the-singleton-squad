package com.unimib.singletonsquad.doit.service.statistic;

import com.google.gson.JsonObject;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StatisticRequestService {

    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    public JsonObject getRequestStatistic(Long requestId) {
        VolunteerRequest request = volunteerRequestDatabaseService.getSpecificRequest(requestId);
        Integer totaleVoti = request.getTotalFeedbacks();
        Double media = (totaleVoti == 0) ? 0.0 : request.getSommaVoti()/totaleVoti;
        JsonObject statistic = new JsonObject();
        statistic.addProperty("totalVotes", totaleVoti);
        statistic.addProperty("mediaVotes", media);
        return statistic;
    }

}
