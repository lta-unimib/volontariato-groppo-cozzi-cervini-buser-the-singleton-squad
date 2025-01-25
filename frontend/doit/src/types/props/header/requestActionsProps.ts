export interface RequestActionsProps {
    role: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onSubscribe?: () => void;
    onUnsubscribe?: () => void;
    onRemoveSavedOrg?: () => void;
    onReview?: () => void;
    isSubscribed?: boolean;
    hasSavedOrganization?: boolean;
    isEventExpired?: boolean;
    hasNotReviewed?: boolean;
    isLoading?: boolean;
}

