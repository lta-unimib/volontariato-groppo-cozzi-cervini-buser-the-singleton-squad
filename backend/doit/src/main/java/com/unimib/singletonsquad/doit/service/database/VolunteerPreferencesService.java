package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.VolunteerPreferences;
import com.unimib.singletonsquad.doit.repository.IVolunteerPreferencesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class VolunteerPreferencesService {

    @Autowired
    private IVolunteerPreferencesRepository volunteerPreferencesRepository;

    public VolunteerPreferences save(VolunteerPreferences volunteerPreferences) {
        return this.volunteerPreferencesRepository.save(volunteerPreferences);
    }
    public Optional<VolunteerPreferences> findById(Long id) {
        return this.volunteerPreferencesRepository.findById(id);
    }

    /*
    public void updatePreferences(VolunteerPreferences preferences) {

    }

    public VolunteerPreferences save(VolunteerPreferences preferences) {
        this.volunteerPreferencesRepository.save(preferences);
    }*/
}