package com.unimib.singletonsquad.doit.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unimib.singletonsquad.doit.exception.InternalSecurityException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public final class ResponseUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper(); // Oggetto ObjectMapper statico

    private ResponseUtils() {}

    public static void sendJsonResponse(HttpServletResponse response, int status, Object body) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            String jsonResponse = (body instanceof String) ? (String) body : objectMapper.writeValueAsString(body);
            response.getWriter().write(jsonResponse);
        } catch (Exception e) {
            String errorJson = createErrorResponse(e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(errorJson);
        }
    }

    private static String createErrorResponse(Exception e) {
        return "{\"error\": \"" + e.getMessage() + "\"}";
    }

    public static void sendRedirect(HttpServletResponse response, String url, HttpServletRequest request) {
        try {
            if (!response.isCommitted()) {
                response.sendRedirect(url);
            } else {
                System.out.println("DEBUG: Response already committed, cannot redirect to URL.");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Error redirecting to URL: " + e.getMessage());
            // Fallback to forward
            sendForwardRedirect(request, response, url);
        }
    }

    public static void sendForwardRedirect(HttpServletRequest request, HttpServletResponse response, String url) {
        try {
            if (!response.isCommitted()) {
                request.getRequestDispatcher(url).forward(request, response);
            } else {
                System.out.println("DEBUG: Response already committed, cannot forward to URL.");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Error forwarding to URL: " + e.getMessage());
            // Handle failure during forward
            sendFailureRedirect(request, response, "Error forwarding to URL.", url);
        }
    }

    public static void sendFailureRedirect(HttpServletRequest request, HttpServletResponse response, String message, String url) {
        try {
            if (!response.isCommitted()) {
                request.setAttribute("errorMessage", message);
                request.getRequestDispatcher(url).forward(request, response);
            } else {
                System.out.println("DEBUG: Response already committed, cannot forward to failure URL.");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Error forwarding to failure URL: " + e.getMessage());
            throw new InternalSecurityException(e.getMessage(), request.getRequestURI());
        }
    }
}
