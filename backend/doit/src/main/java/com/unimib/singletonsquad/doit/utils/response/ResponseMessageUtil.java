package com.unimib.singletonsquad.doit.utils.response;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;

public class ResponseMessageUtil {

    public static JsonNode createJsonNode(final String value, final String message) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode tokenJson = mapper.createObjectNode();
        return tokenJson.put(value, message);
    }

    public static ResponseMessage createResponse(String message, HttpStatus status, Object data) {
        return new ResponseMessage.Builder(message)
                .data(data)
                .status(status)
                .build();
    }

    public static ResponseMessage createResponse(String message, HttpStatus status) {
        return createResponse(message, status, null);
    }
}
