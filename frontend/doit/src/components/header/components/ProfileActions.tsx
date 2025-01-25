import { Button } from "@/components/core/Button";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineRemove } from "react-icons/md";
import React from "react";

interface ProfileActionsProps {
    role: 'volunteer' | 'organization';
    isOwnProfile: boolean;
    hasSavedOrganization?: boolean;
    hasParticipatedInEvent?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onRemoveSavedOrg?: () => void;
    onReview?: () => void;
}

/**
 * ProfileActions component renders actions based on user role and profile ownership
 *
 * @param props - Component props defining actions and context
 */
export const ProfileActions: React.FC<ProfileActionsProps> = ({
                                                                  role,
                                                                  isOwnProfile,
                                                                  hasSavedOrganization = false,
                                                                  hasParticipatedInEvent = false,
                                                                  onEdit,
                                                                  onDelete,
                                                                  onRemoveSavedOrg,
                                                                  onReview
                                                              }) => {
    if (isOwnProfile) {
        // User is viewing their own profile
        return (
            <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={onDelete}
                >
                    <MdOutlineDelete />
                </Button>
                <Button
                    variant="secondary"
                    size="default"
                    onClick={onEdit}
                >
                    <MdOutlineEdit className="mr-2" /> Modifica
                </Button>
            </div>
        );
    }

    // User is viewing another's profile -> aggiungi possibilità di salvare
    if (role === 'volunteer') {
        return (
            <div className="flex gap-2 mt-4 md:mt-0">
                {hasSavedOrganization && onRemoveSavedOrg && (
                    <Button
                        variant="secondary"
                        size="default"
                        onClick={onRemoveSavedOrg}
                    >
                        <MdOutlineRemove className="mr-2" /> Rimuovi dai salvati
                    </Button>
                )}
            </div>
        );
    }

    // For organization viewing a volunteer profile
    return (
        <div className="flex gap-2 mt-4 md:mt-0">
            {hasParticipatedInEvent && (
                <Button
                    variant="default"
                    size="default"
                    onClick={onReview}
                >
                    Recensisci
                </Button>
            )}
        </div>
    );
};