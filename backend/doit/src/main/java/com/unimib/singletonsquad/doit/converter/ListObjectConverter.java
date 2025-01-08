package com.unimib.singletonsquad.doit.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;

@Converter // Usa questa annotazione per far riconoscere la classe come convertitore JPA
public class ListObjectConverter implements AttributeConverter<List<Object>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Object> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute); // Serializza la lista in formato JSON
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Errore durante la serializzazione della lista", e);
        }
    }

    @Override
    public List<Object> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, List.class); // Deserializza da JSON
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Errore durante la deserializzazione della lista", e);
        }
    }
}
