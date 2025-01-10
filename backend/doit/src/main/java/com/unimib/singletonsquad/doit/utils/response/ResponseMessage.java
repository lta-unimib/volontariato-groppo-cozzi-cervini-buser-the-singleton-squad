package com.unimib.singletonsquad.doit.utils.response;

public class ResponseMessage {
    private final String message;
    private final Object data;
    private final int status;

    private ResponseMessage(Builder builder) {
        this.message = builder.message;
        this.data = builder.data;
        this.status = builder.status;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }

    public int getStatus() {
        return status;
    }

    public static class Builder {
        private String message;
        private Object data = null;
        private int status = 0;

        public Builder(String message) {
            if (message == null || message.trim().isEmpty()) {
                throw new IllegalArgumentException("Message cannot be null or empty");
            }
            this.message = message;
        }

        public Builder data(Object data) {
            this.data = data;
            return this;
        }

        public Builder status(int status) {
            this.status = status;
            return this;
        }

        public ResponseMessage build() {
            return new ResponseMessage(this);
        }
    }
}
