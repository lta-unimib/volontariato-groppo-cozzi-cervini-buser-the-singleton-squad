package com.unimib.singletonsquad.doit.utils.common;

import com.unimib.singletonsquad.doit.dto.RequestMatchDTO;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ParallelSort {

    // Metodo per ordinare una lista di oggetti Person in base al campo 'age' in modo parallelo
    public static List<?> sortPersonsByAge(List<RequestMatchDTO> persons) {
        // Ordina la lista usando parallelStream() e un Comparator in modo parallelo
        persons = persons.parallelStream()
                .sorted(Comparator.comparingInt(RequestMatchDTO::getPoints).reversed()) // Ordinamento per 'age'
                .collect(Collectors.toList()); // Raccoglie i risultati ordinati in una nuova lista

        // Stampa la lista ordinata
        return persons;
    }
}