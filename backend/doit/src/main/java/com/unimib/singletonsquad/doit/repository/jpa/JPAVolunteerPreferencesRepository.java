package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerPreferencesRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerPreferencesRepository extends JpaRepository<VolunteerPreferences, Long>, IVolunteerPreferencesRepository { }
