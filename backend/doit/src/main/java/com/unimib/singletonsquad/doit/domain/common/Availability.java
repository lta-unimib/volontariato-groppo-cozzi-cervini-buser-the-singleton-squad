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
    @Convert(converter = ListObjectConverter.class) // Usa il convertitore per serializzare/ deserializzare la lista
    @Lob // Specifica che la colonna può contenere un oggetto di grandi dimensioni (ad esempio, JSON)
    @Column(name = "data", columnDefinition = "TEXT") // Opzionale: definire una colonna di tipo TEXT
    private List<String> data;
}
