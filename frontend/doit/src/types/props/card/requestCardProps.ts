import {Request} from "@/types/request";

/**
 * Props for the `RequestCard` component.
 *
 * The `RequestCard` component is used to display detailed information about a specific request.
 *
 * @param organization The name of the organization associated with the request.
 * @param title The title or name of the request.
 * @param location The location where the request is taking place.
 * @param date The date of the request.
 * @param image The URL or path to the image representing the request.
 * @param role The role of the user related to the request, either 'volunteer' or 'organization'.
 * @param requestData The full request data, of type `Request`, containing additional details about the request.
 */
export interface RequestCardProps {
    organization: string;
    title: string;
    location: string;
    date: string;
    image: string;
    role: 'volunteer' | 'organization';
    requestData: Request;
}
