package com.unimib.singletonsquad.doit.controller;
import jakarta.servlet.RequestDispatcher;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
public class OurErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object message = request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        Object path = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);

        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("timestamp", System.currentTimeMillis());
        errorDetails.put("path", path != null ? path : request.getRequestURI());
        errorDetails.put("message", message != null ? message : "Unexpected error");

        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500

        if (status != null) {
            int statusCode = Integer.parseInt(status.toString());
            httpStatus = HttpStatus.valueOf(statusCode);
        }

        errorDetails.put("status", httpStatus.value());
        errorDetails.put("error", httpStatus.getReasonPhrase());

        return new ResponseEntity<>(errorDetails, httpStatus);
    }
}