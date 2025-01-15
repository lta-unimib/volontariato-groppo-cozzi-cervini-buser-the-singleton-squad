package com.unimib.singletonsquad.doit.utils.response;

import org.springframework.http.HttpStatus;

public class ResponseMessageUtil {

    public static ResponseMessage createResponse(String message, HttpStatus status, Object data) {
        return new ResponseMessage.Builder(message)
                .data(data)
                .status(status)
                .build();
    }

    public static ResponseMessage createResponse(String message, HttpStatus status) {
        return createResponse(message, null, status);
    }
}
