package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Optional<Volunteer> findVolunteerById(int id) {
        return volunteerRepository.findById((long) id);
    }

    public Optional<Volunteer> findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email);
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }


}
