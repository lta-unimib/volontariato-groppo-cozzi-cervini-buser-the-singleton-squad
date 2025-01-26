package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.organization.FeedbackOrganization;
import com.unimib.singletonsquad.doit.domain.volunteer.FeedbackVolunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;

public class FeedbackMapper {

    private FeedbackMapper() {}

    public static FeedbackVolunteer createFeedbackVolunteer(double voto) {
        FeedbackVolunteer feedback = new FeedbackVolunteer();
        feedback.setVote(voto);
        return feedback;
    }

    public static FeedbackOrganization createFeedbackOrganization(double voto, Long userId, VolunteerRequest volunteerRequest) {
        FeedbackOrganization feedback = new FeedbackOrganization();
        feedback.setVote(voto);
        feedback.setVolunteerId(userId);
        feedback.setVolunteerRequest(volunteerRequest);
        return feedback;
    }
}
