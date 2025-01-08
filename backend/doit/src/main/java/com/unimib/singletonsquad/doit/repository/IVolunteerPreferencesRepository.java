package com.unimib.singletonsquad.doit.repository;
import com.unimib.singletonsquad.doit.domain.VolunteerPreferences;

import java.util.Optional;

public interface IVolunteerPreferencesRepository {
    VolunteerPreferences save(VolunteerPreferences volunteerPreferences);
    Optional<VolunteerPreferences> findById(Long id);
    boolean existsById(Long id);
}
