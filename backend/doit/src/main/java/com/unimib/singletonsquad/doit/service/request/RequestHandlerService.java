package com.unimib.singletonsquad.doit.service.request;

public abstract class RequestHandlerService {


    public Object handlerRequest(Object... request) {
        if(!checkSender(request[0].toString(), request[1].toString()))
            throw new IllegalArgumentException("Sender doesn't match");

        return null;
    }
    private boolean checkSender(String roleRequest, String roleDesired) {
        return (roleRequest.equalsIgnoreCase(roleDesired));
    }
}
