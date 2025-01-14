package com.unimib.singletonsquad.doit.repository.concrete_repository;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;

import java.util.Optional;

public interface IVolunteerPreferencesRepository {
    VolunteerPreferences save(VolunteerPreferences volunteerPreferences);
    Optional<VolunteerPreferences> findById(Long id);
    boolean existsById(Long id);
    void removeVolunteerPreferencesById(Long id);
}
