import {OrganizationFormData} from "@/types/form/auth/organizationFormData";

export interface ProfileContentProps {
    organizationProfile: OrganizationFormData;
    categories: { id: string; label: string }[];
    formatWebsiteUrl: (url: string) => string;
}