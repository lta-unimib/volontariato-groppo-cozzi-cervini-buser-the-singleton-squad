package com.unimib.singletonsquad.doit.utils.response;

import org.springframework.http.HttpStatus;

public class ResponseMessageUtil {

    public static ResponseMessage createResponse(String message, Object data, int status) {
        return new ResponseMessage.Builder(message)
                .data(data)
                .status(status)
                .build();
    }

    public static ResponseMessage createResponse(String message, int status) {
        return createResponse(message, null, status);
    }

    public static ResponseMessage createSuccessResponse(String message, Object data) {
        return createResponse(message, data, HttpStatus.OK.value());
    }

    public static ResponseMessage createErrorResponse(String message, int status) {
        return createResponse(message, status);
    }
}
