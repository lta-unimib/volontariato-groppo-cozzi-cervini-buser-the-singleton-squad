package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.converter.ListObjectConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "availability")
public class Availability{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("mode")
    private String mode;
    @JsonProperty("data")
    @Convert(converter = ListObjectConverter.class)
    @Lob
    @Column(name = "data", columnDefinition = "TEXT")
    private List<String> data;

    public boolean matching(String start, String end) {
        //return isBetween(LocalDateTime.parse(start), LocalDateTime.parse(end));
        System.out.println(start);
        System.out.println(end);

         
        return true;
    }

    public boolean isBetween(LocalDateTime start, LocalDateTime end) {
        LocalDateTime availabilityData = LocalDateTime.now();//TODO CHANGE
        return availabilityData.isAfter(start) && availabilityData.isBefore(end);
    }
}
