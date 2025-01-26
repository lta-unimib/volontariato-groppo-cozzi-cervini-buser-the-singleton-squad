import { Request } from "@/types/request";


export interface RequestSectionProps {
    title: string;
    requests: Request[];
    role?: 'volunteer' | 'organization';
}
