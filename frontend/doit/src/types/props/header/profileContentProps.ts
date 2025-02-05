import {OrganizationFormData} from "@/types/form/auth/organizationFormData";
import {VolunteerFormData} from "@/types/form/auth/volunteerFormData";


export interface ProfileContentProps {
    organizationProfile: OrganizationFormData;
    formatWebsiteUrl: (url: string) => string;
    readOnly: boolean;
}

export interface VolunteerProfileContentProps {
    volunteerProfile: VolunteerFormData;
    selectedDays: Date[];
    isAvailable: boolean;
    readOnly: boolean;
}