package com.unimib.singletonsquad.doit.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public final class ResponseUtils {

    public ResponseUtils() {}

    public static void sendJsonResponse(HttpServletResponse response, int status, Object body) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            if (body instanceof String) {
                response.getWriter().write((String) body);
            } else {
                ObjectMapper objectMapper = new ObjectMapper();
                response.getWriter().write(objectMapper.writeValueAsString(body));
            }
        } catch (Exception e) {
            e.printStackTrace();
            String errorJson = "{\"error\": \"" + e.getMessage() + "\"}";
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(errorJson);
        }
    }


}
