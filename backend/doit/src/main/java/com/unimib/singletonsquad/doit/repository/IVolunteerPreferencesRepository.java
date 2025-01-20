package com.unimib.singletonsquad.doit.repository;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IVolunteerPreferencesRepository extends JpaRepository<VolunteerPreferences, Integer> {
    Optional<VolunteerPreferences> findById(Long id);
    boolean existsById(Long id);
    void removeVolunteerPreferencesById(Long id);
}
