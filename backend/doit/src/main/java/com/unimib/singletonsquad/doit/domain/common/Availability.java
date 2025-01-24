package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "mode", discriminatorType = DiscriminatorType.STRING)
@Table(name = "availability")
public abstract class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "volunteer_preferences_id")
    private VolunteerPreferences preferences;

    public abstract void setData(List<String> data);
    public abstract boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime);
    public abstract String getMode();
    public abstract List<String> getDataAsList();
}