package com.unimib.singletonsquad.doit.utils.common;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseMessageUtil {

    public static JsonNode createJsonNode(final String value, final String message) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode tokenJson = mapper.createObjectNode();
        return tokenJson.put(value, message);
    }

    private static ResponseMessage createResponseMessage(String message, HttpStatus status, Object data) {
        return new ResponseMessage.Builder(message)
                .data(data)
                .status(status)
                .build();
    }


    public static ResponseEntity<ResponseMessage> createResponseSuccess(String message, HttpStatus status, Object data) {
        ResponseMessage response = createResponseMessage(message, status, data);
        return  ResponseEntity.status(status).body(response);
    }

    public static ResponseMessage createOnlyResponseMessage(String message, HttpStatus status, Object data) {
        return createResponseMessage(message, status, data);
    }
}
