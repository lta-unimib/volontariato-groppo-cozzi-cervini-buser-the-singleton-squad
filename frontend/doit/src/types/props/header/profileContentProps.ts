import {OrganizationFormData} from "@/types/form/auth/organizationFormData";
import {VolunteerFormData} from "@/types/form/auth/volunteerFormData";

/**
 * Props for the `ProfileContent` component.
 *
 * The `ProfileContent` component is responsible for displaying the detailed profile information of an organization.
 * It shows the organization's data, including categories and formatted website URL.
 *
 * @param organizationProfile The profile data of the organization, including information like name, description,
 * address, etc. This is of type `OrganizationFormData`.
 *
 * @param categories A list of categories associated with the organization, where each category has an `id` and
 * a `label`. This allows the organization to be categorized or classified under specific groups.
 *
 * @param formatWebsiteUrl A function used to format the organization's website URL. It receives the raw URL string
 * and returns the formatted version, possibly adding "http://" or "https://" if not already present.
 */
export interface ProfileContentProps {
    organizationProfile: OrganizationFormData;
    formatWebsiteUrl: (url: string) => string;
}

export interface VolunteerProfileContentProps {
    volunteerProfile: VolunteerFormData;
    selectedDays: Date[];
    isAvailable: boolean;
}