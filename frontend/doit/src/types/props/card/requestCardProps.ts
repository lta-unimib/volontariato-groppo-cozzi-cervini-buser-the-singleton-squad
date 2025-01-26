import {Request} from "@/types/request";

export interface RequestCardProps {
    organization: string;
    title: string;
    location: string;
    date: string;
    image: string;
    role: 'volunteer' | 'organization';
    requestData: Request;
}
