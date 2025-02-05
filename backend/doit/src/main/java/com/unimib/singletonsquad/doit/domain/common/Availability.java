package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    public abstract void setData(List<String> data);
    public abstract boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime);
    public abstract String getMode();
    public abstract List<String> getDataAsList();
}