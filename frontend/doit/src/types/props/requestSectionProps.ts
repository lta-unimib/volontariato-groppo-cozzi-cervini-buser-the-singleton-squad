import { Request } from "@/types/request";

/**
 * Props for the RequestSection component, which displays a section of requests.
 * This interface defines the necessary properties to configure and display the section content.
 *
 * @interface RequestSectionProps
 *
 * @property {string} title - The title of the request section.
 * @property {Request[]} requests - A list of requests to display in the section.
 * @property {'volunteer' | 'organization'} [role] - The role of the user (optional). Can be either 'volunteer' or 'organization', determining what information is shown or how requests are handled.
 */
export interface RequestSectionProps {
    title: string;
    requests: Request[];
    role?: 'volunteer' | 'organization';
}
