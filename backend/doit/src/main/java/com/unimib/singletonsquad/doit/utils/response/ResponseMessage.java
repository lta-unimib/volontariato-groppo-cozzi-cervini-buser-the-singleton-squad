package com.unimib.singletonsquad.doit.utils.response;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@Getter
public class ResponseMessage {
    private final String message;
    private final JsonNode data;
    private final HttpStatus status;

    private ResponseMessage(Builder builder) {
        this.message = builder.message;
        this.data = builder.data;
        this.status = builder.status;
    }

    public static class Builder {
        ObjectMapper objectMapper = new ObjectMapper();
        private String message;
        private JsonNode data = null;
        private HttpStatus status;

        public Builder(String message) {
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("Message cannot be null or empty");
            }
            this.message = message;
        }

        public Builder data(Object data) {
            JsonNode temp = objectMapper.valueToTree(data);
            this.data = temp;
            return this;
        }

        public Builder status(HttpStatus status) {
            this.status = status;
            return this;
        }

        public ResponseMessage build() {
            return new ResponseMessage(this);
        }
    }
}
