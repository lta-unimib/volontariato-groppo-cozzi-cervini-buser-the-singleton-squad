package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.volunteer.FeedbackVolunteer;

public class FeedbackMapper {

    private FeedbackMapper() {}

    public static FeedbackVolunteer createFeedbackVolunteer(double voto) {
        FeedbackVolunteer feedback = new FeedbackVolunteer();
        feedback.setVote(voto);
        return feedback;
    }
    /// todo aggiungere il feedbackOrganization
}
