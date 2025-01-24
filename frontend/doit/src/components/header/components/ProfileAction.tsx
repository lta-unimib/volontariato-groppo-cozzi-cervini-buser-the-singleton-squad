import { Button } from "@/components/core/Button";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineBookmarkBorder, MdOutlineCheck } from "react-icons/md";
import React from "react";
import { ProfileActionsProps } from "@/types/props/header/profileActionsProps";

/**
 * ProfileActions component renders a set of buttons with different actions based on the user's role.
 * - Volunteers can save and participate in organizations.
 * - Organizations can delete and edit their profile.
 *
 * @component
 *
 * @param props - The props for the ProfileActions component.
 * @param props.role - The role of the user, determines the available actions.
 * @param props.onEdit - Callback function for editing an organization profile (for organization role).
 * @param props.onDelete - Callback function for deleting an organization profile (for organization role).
 * @param props.onSave - Callback function for saving an organization (for volunteer role).
 * @param props.onSubscribe - Callback function for subscribing to an organization (for volunteer role).
 */
export const ProfileActions: React.FC<ProfileActionsProps> = ({ role, onEdit, onDelete, onSave, onSubscribe }) => (
    <div className="flex gap-2 mt-4 md:md-0">
        {role === 'volunteer' && (
            <>
                <Button
                    variant="secondary"
                    size="default"
                    onClick={onSave}
                >
                    <MdOutlineBookmarkBorder className="mr-2" /> Salva Organizzazione
                </Button>
                <Button
                    variant="default"
                    size="default"
                    onClick={onSubscribe}
                >
                    <MdOutlineCheck className="mr-2" /> Partecipa
                </Button>
            </>
        )}
        {role === 'organization' && (
            <>
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
            </>
        )}
    </div>
);
