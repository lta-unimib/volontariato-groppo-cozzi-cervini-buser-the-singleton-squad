/**
 * Props for the `RequestHeader` component.
 *
 * The `RequestHeader` component is used to display the header section for a request,
 * including the title, organization name, address, image, and additional details about the request.
 * It can optionally display the categories associated with the request and the role of the user (organization or volunteer).
 *
 * @param title The title of the request.
 *
 * @param organizationName The name of the organization that made the request.
 *
 * @param address The address where the request is relevant or where the organization is located.
 *
 * @param imageUrl The URL of the image to be displayed (could be the organization's logo or other related images).
 *
 * @param requestData (Optional) An object containing additional request details, such as the categories associated with the request.
 *
 * @param role (Optional) The role of the user viewing the request. Can be either 'organization' or 'volunteer'.
 */
export interface RequestHeaderProps {
    title: string;
    organizationName: string;
    address: string;
    imageUrl: string;
    requestData: {
        categories?: string[];
    };
    role?: 'organization' | 'volunteer';
}