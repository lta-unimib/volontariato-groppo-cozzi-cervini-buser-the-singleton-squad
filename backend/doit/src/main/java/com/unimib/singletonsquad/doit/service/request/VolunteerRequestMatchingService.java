package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.RequestMatchDTO;
import com.unimib.singletonsquad.doit.utils.common.ParallelSort;
import com.unimib.singletonsquad.doit.utils.data.DistanceCalculator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerRequestMatchingService {

    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;


    public List<VolunteerRequest> getVolunteerRequestBasedOnPreferences(Volunteer volunteer, List<VolunteerRequest> requestSaved) throws UnsupportedEncodingException, InterruptedException {
        double[] volunteerCoordinates = getVolunteerCoordinate(volunteer);
        List<RequestMatchDTO> requestsToBeSorted = new ArrayList<>();
        int[] points = new int[requestSaved.size()];

        for(int i =0; i < points.length; i++){
            VolunteerRequest request = requestSaved.get(i);
            points[i] = addPointToRequest(volunteer.getVolunteerPreferences(),
                    request, volunteerCoordinates);
            requestsToBeSorted.add(new RequestMatchDTO(request, points[i]));
        }
        return ParallelSort.sortRequestByVote(requestsToBeSorted);
    }

    private CityInfo getVolunteerCityInfo(final String volunteerCity) throws UnsupportedEncodingException, InterruptedException {
        return getCityInfo(volunteerCity);
    }

    private double[] getVolunteerCoordinate(Volunteer volunteer) throws UnsupportedEncodingException, InterruptedException {
        CityInfo temp = getVolunteerCityInfo(volunteer.getVolunteerPreferences().getCity());
        return new double[]{temp.getLatitude(), temp.getLongitude()};
    }

    private CityInfo getCityInfo(String city) throws UnsupportedEncodingException, InterruptedException {
        return this.volunteerRequestDatabaseService.getCityInfo(city);
    }

    private int addPointToRequest(VolunteerPreferences preferences,
                                  VolunteerRequest volunteerRequest,
                                  double[] volunteerCoordinates) throws UnsupportedEncodingException, InterruptedException {
        int score =0;
        score+=preferences.hasCategories(volunteerRequest.getVolunteerCategories()) ? 10 : 0;
        score+=preferences.hasAvailability(volunteerRequest.getStartDateTime(), volunteerRequest.getEndDateTime()) ? 10 : 0;
        score+=addPointToRequestDistance(volunteerRequest.getAddress().getCity(), volunteerCoordinates);
        return score;
    }

    private int addPointToRequestDistance(final String cityRequest, final double[] volunteerCoords) throws UnsupportedEncodingException, InterruptedException {
        CityInfo requestCity = this.getCityInfo(cityRequest);
        double latVolunteer = requestCity.getLatitude();
        double lonVolunteer = requestCity.getLongitude();
        double distance = DistanceCalculator.calculateDistance(latVolunteer, lonVolunteer, volunteerCoords[0], volunteerCoords[1]);
        return calculateDistancePoints(distance);
    }

    private int calculateDistancePoints(final double distance) {
        if(distance <0)
            return -1;
        else if (distance < 10)
            return 10;
        else if (distance < 30)
            return 7;
        else if (distance < 60)
            return 5;
        else if(distance < 80)
            return 3;
        else if (distance < 100)
            return 2;
        else if(distance < 150)
            return 1;
        else
            return 0;
    }


}
