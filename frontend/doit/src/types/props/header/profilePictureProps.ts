/**
 * Props for the `ProfilePicture` component.
 *
 * The `ProfilePicture` component is used to display the profile picture of a user or organization.
 * It accepts the image URL and an optional availability status, which can be used to display additional indicators
 * related to the availability of the user or organization.
 *
 * @param imageUrl The URL of the profile picture to be displayed.
 *
 * @param isAvailable (Optional) A boolean flag indicating the availability status of the user or organization.
 * If provided, it can be used to overlay an indicator or change the appearance of the profile picture to reflect availability.
 */
export interface ProfilePictureProps {
    imageUrl: string;
    isAvailable?: boolean;
}
