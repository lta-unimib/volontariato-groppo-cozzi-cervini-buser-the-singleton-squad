/**
 * Props for the `ProfileActions` component.
 *
 * The `ProfileActions` component is used to manage the actions related to a user's profile. It provides options
 * for editing, saving, deleting, or subscribing based on the user's role and current profile state.
 *
 * @param role The role of the user, which can either be `organization` or `volunteer`. This determines which
 * set of actions are available for the user in the profile.
 *
 * @param onEdit A callback function triggered when the user clicks the "Edit" button. This typically opens a
 * form or modal for modifying profile details.
 *
 * @param onDelete (Optional) A callback function triggered when the user clicks the "Delete" button. This is
 * typically used for deleting the user's profile or related data. This function is optional, as not all profiles
 * may support deletion.
 *
 * @param onSave (Optional) A callback function triggered when the user clicks the "Save" button. This is used
 * to save changes made to the profile. It is optional because the component might be in a read-only state.
 *
 * @param onSubscribe (Optional) A callback function triggered when the user clicks the "Subscribe" button. This
 * could be used for subscribing to updates, notifications, or newsletters. This is optional as not all profiles
 * may have a subscription feature.
 */
export interface ProfileActionsProps {
    role: 'organization' | 'volunteer';
    onEdit: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onSubscribe?: () => void;
}
