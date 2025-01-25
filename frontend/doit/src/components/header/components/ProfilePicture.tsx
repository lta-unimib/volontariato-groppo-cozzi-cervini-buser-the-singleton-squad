import Image from "next/image";
import React from "react";
import { ProfilePictureProps } from "@/types/props/header/profilePictureProps";

/**
 * ProfilePicture component displays a user's profile image with an optional availability indicator.
 *
 * The component renders:
 * - A profile picture with rounded edges and a shadow.
 * - An optional availability indicator that shows a green dot for available or a red dot for unavailable.
 *
 * @component
 *
 * @param {ProfilePictureProps} props - The props for the ProfilePicture component.
 * @param {string} props.imageUrl - The URL of the profile image.
 * @param {boolean | undefined} [props.isAvailable] - An optional flag indicating the availability of the user. If `true`, a green dot is displayed; if `false`, a red dot is shown.
 *
 * @returns The rendered profile picture component.
 */
export const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageUrl, isAvailable }) => (
    <div className="relative">
        <Image
            src={imageUrl}
            alt="Profile picture"
            className="w-36 h-36 object-cover rounded-full shadow-lg"
            width={144}
            height={144}
            priority
        />
        {isAvailable !== undefined && (
            <span
                className={`absolute bottom-3 right-3 w-4 h-4 rounded-full ${
                    isAvailable ? "bg-green-500" : "bg-red-500"
                }`}
                title={isAvailable ? "Available" : "Unavailable"}
            />
        )}
    </div>
);
