export interface ProfileActionsProps {
    role: 'organization' | 'volunteer';
    onEdit: () => void;
    onDelete?: () => void;
    onSave?: () => void;
    onSubscribe?: () => void;
}