package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.Availability;
import com.unimib.singletonsquad.doit.domain.VolunteerPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerPreferencesRepository extends JpaRepository<VolunteerPreferences, Long>, IVolunteerPreferencesRepository {

}
