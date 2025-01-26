package com.unimib.singletonsquad.doit.service.statistic;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;

@Service
@AllArgsConstructor
public class StatisticRequestService {
    private VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    public ObjectNode getRequestStatistic(Long requestId) {
        VolunteerRequest request = volunteerRequestDatabaseService.getSpecificRequest(requestId);
        Integer totaleVoti = request.getTotalFeedbacks();
        Double media = (totaleVoti == 0) ? 0.0 : request.getSommaVoti() / totaleVoti;

        ObjectNode statistic = JsonNodeFactory.instance.objectNode();
        statistic.put("totalReviews", totaleVoti);
        statistic.put("averageRating", media);

        return statistic;
    }

}