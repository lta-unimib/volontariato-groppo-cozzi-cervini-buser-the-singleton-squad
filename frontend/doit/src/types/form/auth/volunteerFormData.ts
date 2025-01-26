import { AvailabilityFormData } from "../availability/availabilityFormData";
import { BaseUserData } from "../baseFormData";


export interface VolunteerFormData extends BaseUserData {
    readonly availability: AvailabilityFormData;
    readonly firstName: string;
    readonly lastName: string;
    readonly role?: string;
}
