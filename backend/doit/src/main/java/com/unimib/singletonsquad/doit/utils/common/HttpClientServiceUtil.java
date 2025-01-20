package com.unimib.singletonsquad.doit.utils.common;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class HttpClientServiceUtil {

    private final WebClient webClient;

    // Costruttore per inizializzare WebClient
    public HttpClientServiceUtil() {
        this.webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    // Metodo POST generico
    public <T, R> R executePost(String url, T requestBody, Class<R> responseClass) {
        try {
            return webClient.post()
                    .uri(url)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(responseClass)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("Errore nella chiamata HTTP: " + e.getMessage(), e);
        }
    }

    // Metodo GET generico
    public <R> R executeGet(String url, Class<R> responseClass) {
        try {
            return webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(responseClass)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("Errore nella chiamata HTTP: " + e.getMessage(), e);
        }
    }

    // Metodo PUT generico
    public <T, R> R executePut(String url, T requestBody, Class<R> responseClass) {
        try {
            return webClient.put()
                    .uri(url)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(responseClass)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("Errore nella chiamata HTTP: " + e.getMessage(), e);
        }
    }

    // Metodo DELETE generico
    public void executeDelete(String url) {
        try {
            webClient.delete()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(Void.class)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("Errore nella chiamata HTTP: " + e.getMessage(), e);
        }
    }

    // Metodo per chiamare OpenCage API e ottenere la geocodifica di un indirizzo
    public double[] getCoordinatesFromOpenCage(String address) throws Exception {
        String apiKey = "f076219cc61b45e3a724963a338ff555"; // Sostituisci con la tua API Key OpenCage
        String url = "https://api.opencagedata.com/geocode/v1/json?q=" + address + "&key=" + apiKey;

        try {
            // Chiamata GET al server OpenCage per ottenere la geocodifica
            String response = executeGet(url, String.class);

            // Parsing della risposta JSON
            JsonObject jsonResponse = JsonParser.parseString(response).getAsJsonObject();
            JsonArray results = jsonResponse.getAsJsonArray("results");

            if (results != null && results.size() > 0) {
                JsonObject geometry = results.get(0).getAsJsonObject().getAsJsonObject("geometry");
                double latitude = geometry.get("lat").getAsDouble();
                double longitude = geometry.get("lng").getAsDouble();

                // Restituisci la latitudine e longitudine in formato stringa
                return new double[]{latitude, longitude};
            } else {
                throw new RuntimeException("Errore nella chiamata HTTP: " + response);
            }
        } catch (Exception e) {
            throw new RuntimeException("Errore nella chiamata OpenCage: " + e.getMessage(), e);
        }
    }
}
