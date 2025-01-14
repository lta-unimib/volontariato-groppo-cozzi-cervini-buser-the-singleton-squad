package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.converter.ListObjectConverter;
import jakarta.persistence.*;
import lombok.*;

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
}
