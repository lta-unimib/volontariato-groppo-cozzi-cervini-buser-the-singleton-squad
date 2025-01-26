export interface RequestActionsProps {
    role: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onSubscribe?: () => void;
    onUnsubscribe?: () => void;
    onRemoveSavedOrg?: () => void;
    onRenew?: () => void;
    onReview?: () => void;
    isSubscribed?: boolean;
    hasSavedOrganization?: boolean;
    isEventExpired?: boolean;
    hasNotReviewed?: boolean;
    isTerminated?: boolean;
    isLoading?: boolean;
}

