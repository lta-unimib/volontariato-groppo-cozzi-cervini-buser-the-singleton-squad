package com.unimib.singletonsquad.doit.Service;

import com.unimib.singletonsquad.doit.Domain.Volunteer;
import com.unimib.singletonsquad.doit.Repository.IVolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class VolunteerService {
    private final IVolunteerRepository volunteerRepository;

    @Autowired
    public VolunteerService(IVolunteerRepository volunteerRepository) {
        this.volunteerRepository = volunteerRepository;
    }

    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);  //JpaRepository
    }

    public List<Volunteer> findVolunteersByName(String name) {
        return volunteerRepository.findByName(name); //IVolunteerRepository
    }
}
