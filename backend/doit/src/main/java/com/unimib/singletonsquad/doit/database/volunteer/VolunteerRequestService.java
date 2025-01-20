package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.database.common.CityInfoRepositoryService;
import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerRequestRepository;
import com.unimib.singletonsquad.doit.utils.data.DistanceCalculator;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerRequestService {

    private final IVolunteerRequestRepository repository;
    private final CityInfoRepositoryService cityRepository;


    public VolunteerRequest save(VolunteerRequest volunteerRequest) {
        return repository.save(volunteerRequest);
    }

    public Optional<VolunteerRequest> findRequestById(Long id) {
        return repository.findById(id);
    }

    public void deleteRequestById(Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.deleteById(id);
    }

    public void updateRequest(VolunteerRequest volunteerRequest, Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.save(volunteerRequest);
    }

    public VolunteerRequest getSpecificRequest(Long idRequest) {
        return repository.findById(idRequest)
                .orElseThrow(() -> new RecordNotFoundGeneralException(
                        "VolunteerRequest not found with id " + idRequest));
    }

    public List<VolunteerRequest> getAllRequestByEmail(String email) {
        return repository.findByOrganization_Email(email);
    }

    public List<VolunteerRequest> getAllRequest() {
        return repository.findAll();
    }

    private void validateRequestExists(Long id) {
        if (!repository.existsById(id)) {
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + id);
        }
    }

    public void getVolunteerRequestBasedOnPreferences(VolunteerPreferences volunteerPreferences) throws Exception {
        List<VolunteerRequest> requests = getAllRequest();
        int[] points = new int[requests.size()];
        String volunteerCity = getVolunteerCity(volunteerPreferences);

        for (int i = 0; i < points.length; i++) {
            VolunteerRequest request = requests.get(i);
            points[i] += volunteerPreferences.hasCategories(request.getVolunteerCategories()) ? 1 : 0;
            points[i] += volunteerPreferences.hasAvailability(request.getStartDateTime(), request.getEndDateTime()) ? 1 : 0;
            points[i] += calculatePoint(this.setup(request.getAddress().getCity(), getVolunteerCoords(volunteerCity)));
        }

        for (int point : points) {
            System.out.println(point);
        }
    }

    private String getVolunteerCity(VolunteerPreferences volunteerPreferences){
        return volunteerPreferences.getCity();
    }

    private double setup(@NotNull final String city, @NotNull final double[] volunteerCoords) throws Exception {
        CityInfo requestCity = this.getRequestCoord(city);
        double latVolunteer = requestCity.getLatitude();
        double lonVolunteer = requestCity.getLongitude();
        return DistanceCalculator.calculateDistance(latVolunteer, lonVolunteer, volunteerCoords[0], volunteerCoords[1]);

    }

    private CityInfo getRequestCoord(@NotNull final String city) throws Exception {
        return this.cityRepository.getCityInfo(city);
    }
    private double[] getVolunteerCoords(@NotNull final String city) throws Exception {
        CityInfo requestCity = this.getRequestCoord(city);
        double latVolunteer = requestCity.getLatitude();
        double lonVolunteer = requestCity.getLongitude();
        return new double[]{latVolunteer, lonVolunteer};
    }

    private int calculatePoint(final double distance) {
        if(distance <0)
            return -1;
        else if (distance < 10)
            return 10;
        else if (distance < 30)
            return 7;
        else if(distance < 80)
            return 5;
        else if (distance < 100)
            return 3;
        else if(distance < 150)
            return 1;
        else
            return 0;
    }


}