import { Button } from "@/components/core/Button";
import { MdOutlineEdit, MdOutlineDelete, MdOutlineBookmarkBorder, MdOutlineCheck } from "react-icons/md";
import React from "react";
import {ProfileActionsProps} from "@/types/props/header/profileActionsProps";

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
