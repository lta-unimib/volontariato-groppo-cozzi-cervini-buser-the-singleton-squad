import { AvailabilityFormData } from "../../availabilityFormData";
import { BaseUserData } from "../baseFormData";

/**
 * @interface VolunteerFormData
 * Represents the volunteer form data, extending BaseUserData.
 * Includes the volunteer's first and last name, availability, and optional role.
 *
 * @param firstName The volunteer's first name.
 * @param lastName The volunteer's last name.
 * @param availability The volunteer's availability data.
 * @param role The volunteer's role (optional).
 */
export interface VolunteerFormData extends BaseUserData {
    readonly availability: AvailabilityFormData;
    readonly firstName: string;
    readonly lastName: string;
    readonly role?: string;
}
