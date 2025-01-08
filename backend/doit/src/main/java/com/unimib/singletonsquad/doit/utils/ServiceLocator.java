package com.unimib.singletonsquad.doit.utils;

import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerPreferencesService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;

public class ServiceLocator {
    private static ServiceLocator instance;

    private OrganizationService organizationService;
    private VolunteerPreferencesService volunteerPreferencesService;
    private VolunteerService volunteerService;

    public synchronized ServiceLocator getInstance() {
        if (instance == null) {
            instance = new ServiceLocator();
        }
        return instance;
    }


}
