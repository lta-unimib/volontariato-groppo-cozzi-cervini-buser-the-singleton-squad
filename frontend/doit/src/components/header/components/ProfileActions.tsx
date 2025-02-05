import { Button } from "@/components/core/Button";
import {MdOutlineEdit, MdOutlineDelete, MdOutlineRemove, MdOutlineRateReview} from "react-icons/md";
import React, {useState} from "react";
import {ProfileActionsProps} from "@/types/props/header/profileActionsProps";

export const ProfileActions: React.FC<ProfileActionsProps> = ({
                                                                  role,
                                                                  onSave,
                                                                  onEdit,
                                                                  onDelete,
                                                                  onRemoveSavedOrg,
                                                                  onReview,
                                                                  isOwnProfile,
                                                                  hasPartecipatedInEvent,
                                                                  hasSavedOrganization,
                                                                  isLoading
                                                              }) => {
    if (isLoading) {
        return null;
    }

    const [isSaved, setIsSaved] = useState(hasSavedOrganization);

    const handleRemoveSavedOrg = async () => {
        if (onRemoveSavedOrg) {
            onRemoveSavedOrg();
            setIsSaved(false);
        }
    };

    const handleSaveOrg = async () => {
        if (onSave) {
            onSave();
            setIsSaved(true);
        }
    };

    const handleReview = async () => {
        if (onReview) {
            onReview();
        }
    };

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
                {isSaved && onRemoveSavedOrg ? (
                    <Button
                        variant="destructive"
                        size="default"
                        onClick={handleRemoveSavedOrg}
                    >
                        <MdOutlineRemove className="mr-2" /> Rimuovi dai preferiti
                    </Button>
                ) : (
                    <Button
                        variant="secondary"
                        size="default"
                        onClick={handleSaveOrg}
                    >
                        <MdOutlineEdit className="mr-2" /> Salva organizzazione
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="flex gap-2 mt-4 md:mt-12">
            {hasPartecipatedInEvent && (
                <Button
                    variant="default"
                    size="default"
                    onClick={handleReview}
                >
                    <MdOutlineRateReview className="mr-2" /> Recensisci
                </Button>
            )}
        </div>
    );
};