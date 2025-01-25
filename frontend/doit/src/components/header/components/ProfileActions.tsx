import { Button } from "@/components/core/Button";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineRemove } from "react-icons/md";
import React from "react";
import {ProfileActionsProps} from "@/types/props/header/profileActionsProps";

/**
 * ProfileActions component renders actions based on user role and profile ownership
 *
 * @param props - Component props defining actions and context
 */
export const ProfileActions: React.FC<ProfileActionsProps> = ({
                                                                  role,
                                                                  isOwnProfile,
                                                                  hasSavedOrganization,
                                                                  hasParticipatedInEvent,
                                                                  onSave,
                                                                  onEdit,
                                                                  onDelete,
                                                                  onRemoveSavedOrg,
                                                                  onReview,
                                                                  isLoading
                                                              }) => {
    if (isLoading) {
        return null;  // or return a spinner/loading component
    }

    if (isOwnProfile) {
        // User is viewing their own profile
        // Aggiustare su mobile
        return (
            <div className="flex gap-2 mt-4 md:mt-12">
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

    // User is viewing another profile
    if (role === 'organization') {
        return (
            <div className="flex gap-2 mt-4 md:mt-12">
                {hasSavedOrganization && onRemoveSavedOrg ? (
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={onRemoveSavedOrg}
                    >
                        <MdOutlineRemove className="mr-2" /> Rimuovi dai salvati
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="default"
                        onClick={onSave}
                    >
                        <MdOutlineEdit className="mr-2" /> Salva organizzazione
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