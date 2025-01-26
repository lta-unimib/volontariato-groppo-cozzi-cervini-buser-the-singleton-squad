package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.repository.IFeedbackRepository;

import java.util.List;

public class FeedbackDatabaseService {

    private IFeedbackRepository repository;


    public double getAllVotesByEvents(int offerId) {
        List<Double> votes = repository.getAllVotestByEventsByOfferId(offerId);
    }
}
