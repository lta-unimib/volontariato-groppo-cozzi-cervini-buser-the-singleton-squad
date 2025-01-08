package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class VolunteerService {
    @Autowired
    private final IVolunteerRepository volunteerRepository;


    public Optional<Volunteer> findVolunteerById(long id) {
        return volunteerRepository.findById(id);
    }

    public Optional<Volunteer> findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email);
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }


}