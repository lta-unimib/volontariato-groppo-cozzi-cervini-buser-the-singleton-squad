export interface ProfileActionsProps {
    role: 'volunteer' | 'organization';
    isOwnProfile: boolean;
    hasSavedOrganization?: boolean;
    hasPartecipatedInEvent?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onRemoveSavedOrg?: () => void;
    onReview?: () => void;
    onSave?: () => void;
    isLoading: boolean;
}