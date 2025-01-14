import {AvailabilityData} from "@/types/availabilityData";

export interface BaseFormData {
    email: string;
    password: string;
    description: string;
}

export interface BaseUserData extends BaseFormData{
    city: string;
    preferences: string[];
}

export interface OrganizationFormData extends BaseUserData {
    organizationName: string;
    VATNumber?: string;
    webSite?: string;
    role?: string;
}

export interface VolunteerFormData extends BaseUserData {
    firstName: string;
    lastName: string;
    availability: AvailabilityData | undefined;
    role?: string;
}

export interface OfferFormData extends BaseFormData{
    title: string;
    date: string;
    address: string;
    categories: string[];
    activities: string[];
    volunteerCapacity: string;
}