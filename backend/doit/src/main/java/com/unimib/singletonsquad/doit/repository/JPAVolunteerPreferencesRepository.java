package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerPreferencesRepository extends JpaRepository<VolunteerPreferences, Long>, IVolunteerPreferencesRepository {

}
