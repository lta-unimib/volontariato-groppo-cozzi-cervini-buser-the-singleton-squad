import {AvailabilityData} from "@/types/availabilityData";

export interface BaseFormData {
    id: string;
    city: string;
    preferences: string[];
    description: string;
}

export interface OrganizationFormData extends BaseFormData {
    organizationName: string;
    VATNumber?: string;
    webSite?: string;
}

export interface VolunteerFormData extends BaseFormData {
    availability: AvailabilityData | null;
}