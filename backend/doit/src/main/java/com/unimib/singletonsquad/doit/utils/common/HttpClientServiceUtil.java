package com.unimib.singletonsquad.doit.utils.common;

import com.unimib.singletonsquad.doit.exception.resource.HttpGeneralException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;


@Service
public class HttpClientServiceUtil {

    private final WebClient webClient;

    public HttpClientServiceUtil() {
        this.webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
    /*
   */

    public <R> R executeGet(String url, Class<R> responseClass) {
        try {
            return webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(responseClass)
                    .block();
        } catch (WebClientResponseException e) {
            throw new HttpGeneralException(HttpStatus.INTERNAL_SERVER_ERROR,"Errore nella chiamata HTTP: " + e.getMessage());
        }
    }

    /*
     public <T, R> R executePost(String url, T requestBody, Class<R> responseClass) {
        try {
            return webClient.post()
                    .uri(url)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(responseClass)
                    .block();
        } catch (WebClientResponseException e) {
            throw new RuntimeException("Error in HTTP call: " + e.getMessage(), e);
        }
    }

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
    */
}
