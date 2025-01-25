import {OrganizationFormData} from "@/types/form/auth/organizationFormData";

/**
 * Props for the `OrganizationCard` component.
 *
 * The `OrganizationCard` component is used to display detailed information about an organization.
 *
 * @param organizationData The data of the organization to be displayed in the card.
 */
export interface OrganizationCardProps {
    organizationData: OrganizationFormData;
}
