package com.unimib.singletonsquad.doit.service.http;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.unimib.singletonsquad.doit.exception.resource.HttpGeneralException;
import com.unimib.singletonsquad.doit.exception.resource.ResourceNotFoundGeneralException;
import com.unimib.singletonsquad.doit.utils.common.HttpClientServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
@Service
public class CityInfoHTTPService {
    private final HttpClientServiceUtil http;
    private final String apiKey;

    @Autowired
    public CityInfoHTTPService(HttpClientServiceUtil http, @Value("${api.opencage.key}") String apiKey) {
        this.http = http;
        this.apiKey = apiKey;
    }

    public double[] getCoordinatesFromOpenCage(String address) throws HttpGeneralException, UnsupportedEncodingException {
        String url = String.format("https://api.opencagedata.com/geocode/v1/json?q=%s&key=%s&countrycode=IT",
                URLEncoder.encode(address, "UTF-8"), apiKey);
        try {
            String response = http.executeGet(url, String.class);
            JsonObject jsonResponse = JsonParser.parseString(response).getAsJsonObject();
            JsonArray results = jsonResponse.getAsJsonArray("results");

            if (results != null && results.size() > 0) {
                JsonObject result = results.get(0).getAsJsonObject();
                String formattedAddress = result.get("formatted").getAsString();

                if (formattedAddress.contains("Italy")) {
                    JsonObject geometry = result.getAsJsonObject("geometry");
                    double latitude = geometry.get("lat").getAsDouble();
                    double longitude = geometry.get("lng").getAsDouble();
                    return new double[]{latitude, longitude};
                } else {
                    throw new ResourceNotFoundGeneralException(String.format("City %s is not in Italy", address));
                }
            } else {
                throw new ResourceNotFoundGeneralException(String.format("City %s not found", address));
            }
        } catch (Exception e) {
            throw new HttpGeneralException(HttpStatus.INTERNAL_SERVER_ERROR, String.format("Failed to retrieve coordinates for address: %s", address));
        }
    }
}
