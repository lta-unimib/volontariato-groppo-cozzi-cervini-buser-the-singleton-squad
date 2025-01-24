import { VolunteerFormData } from "../../form/auth/volunteerFormData";
import {OrganizationFormData} from "@/types/form/auth/organizationFormData";

type ProfileData = VolunteerFormData | OrganizationFormData;

export interface ProfileHeaderProps {
    name: string;
    role: string;
    city: string;
    imageUrl: string;
    isAvailable?: boolean;
    profileData: ProfileData;
}
