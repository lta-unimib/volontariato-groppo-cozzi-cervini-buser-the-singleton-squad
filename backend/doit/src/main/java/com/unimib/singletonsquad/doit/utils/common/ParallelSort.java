package com.unimib.singletonsquad.doit.utils.common;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.RequestMatchDTO;

import java.util.Comparator;
import java.util.List;

public class ParallelSort {

    private ParallelSort(){}

    public static List<VolunteerRequest> sortRequestByVote(List<RequestMatchDTO> persons) {
        return persons.parallelStream()
                .sorted(Comparator.comparingInt(RequestMatchDTO::getPoints).reversed())
                .map(RequestMatchDTO::getVolunteerRequest)
                .toList();
    }

}