import { VolunteerFormData } from "../../form/auth/volunteerFormData";
import {OrganizationFormData} from "@/types/form/auth/organizationFormData";

type ProfileData = VolunteerFormData | OrganizationFormData;

/**
 * Props for the `ProfileHeader` component.
 *
 * The `ProfileHeader` component displays the header section of the user's profile, including the user's name, role,
 * city, profile image, and availability status. It also passes the entire profile data, which could be related to
 * either a volunteer or an organization, allowing dynamic rendering based on the profile type.
 *
 * @param name The name of the user or organization. This will be displayed in the header.
 *
 * @param role The role of the user or organization, such as "volunteer" or "organization".
 *
 * @param city The city in which the user or organization is located.
 *
 * @param imageUrl The URL of the profile image to be displayed in the header.
 *
 * @param isAvailable (Optional) A boolean flag indicating whether the user or organization is currently available.
 * This can be used to show an availability status in the profile header.
 *
 * @param profileData The complete profile data, which can be either of type `VolunteerFormData` or `OrganizationFormData`.
 * This will contain all the relevant information of the user or organization.
 */
export interface ProfileHeaderProps {
    name: string;
    role: string;
    city: string;
    imageUrl: string;
    isAvailable?: boolean;
    profileData: ProfileData;
}
