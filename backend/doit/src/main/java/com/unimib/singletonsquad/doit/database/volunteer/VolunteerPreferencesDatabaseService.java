package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.repository.IVolunteerPreferencesRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerPreferencesDatabaseService {
    private final IVolunteerPreferencesRepository volunteerPreferencesRepository;

    public VolunteerPreferences save(VolunteerPreferences volunteerPreferences) {
        return this.volunteerPreferencesRepository.save(volunteerPreferences);
    }
    public Optional<VolunteerPreferences> findById(Long id) {
        return this.volunteerPreferencesRepository.findById(id);
    }


    public void updatePreferences(VolunteerPreferences preferences, Long id) {
        volunteerPreferencesRepository.removeVolunteerPreferencesById(id);
        volunteerPreferencesRepository.save(preferences);
    }
}
