import {BaseUserData} from "@/types/form/baseFormData";


export interface OrganizationFormData extends BaseUserData {
    readonly VATNumber?: string;
    readonly organizationName: string;
    readonly role?: string;
    readonly website?: string;
}