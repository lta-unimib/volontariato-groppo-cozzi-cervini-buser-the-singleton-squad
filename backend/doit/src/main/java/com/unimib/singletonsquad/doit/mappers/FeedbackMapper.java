package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
public class FeedbackMapper {

    private FeedbackMapper() {}

    public static Feedback createFeedback(double voto) {
        Feedback feedback = new Feedback();
        feedback.setVote(voto);
        return feedback;
    }
}
