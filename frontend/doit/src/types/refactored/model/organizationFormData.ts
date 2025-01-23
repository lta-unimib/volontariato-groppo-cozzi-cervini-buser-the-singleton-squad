import {BaseUserData} from "@/types/refactored/model/baseFormData";

/**
 * @interface OrganizationFormData
 * Represents the organization form data, extending BaseUserData.
 * Includes the organization name, VAT number, website, and optional role.
 *
 * @param organizationName The name of the organization.
 * @param VATNumber The VAT number of the organization (optional).
 * @param website The organization's website (optional).
 * @param role The user's role within the organization (optional).
 */
export interface OrganizationFormData extends BaseUserData {
    readonly VATNumber?: string;
    readonly organizationName: string;
    readonly role?: string;
    readonly website?: string;
}