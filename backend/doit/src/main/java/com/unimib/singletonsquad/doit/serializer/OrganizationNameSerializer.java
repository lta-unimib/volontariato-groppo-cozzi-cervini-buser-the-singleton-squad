package com.unimib.singletonsquad.doit.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.unimib.singletonsquad.doit.domain.organization.Organization;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class OrganizationNameSerializer extends JsonSerializer<Organization> {
    @Override
    public void serialize(Organization organization, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (organization != null) {
            Map<String, Object> orgDetails = new HashMap<>();
            orgDetails.put("name", organization.getName());
            orgDetails.put("email", organization.getEmail());
            orgDetails.put("website", organization.getWebsite());
            orgDetails.put("VATNumber", organization.getVATNumber());
            gen.writeObject(orgDetails);
        } else {
            gen.writeNull();
        }
    }
}
