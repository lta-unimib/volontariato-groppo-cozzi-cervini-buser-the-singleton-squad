package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class VolunteerService {

    @Autowired
    private final IVolunteerRepository volunteerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Volunteer> findVolunteerById(long id) {
        return volunteerRepository.findById(id);
    }

    public Optional<Volunteer> findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email);
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public boolean authenticateVolunteer(String email, String rawPassword) {
        Optional<Volunteer> volunteerOptional = volunteerRepository.findByEmail(email);
        if (volunteerOptional.isPresent()) {
            Volunteer volunteer = volunteerOptional.get();
            return passwordEncoder.matches(rawPassword, volunteer.getPassword());
        } else {
            return false;
        }
    }

}
