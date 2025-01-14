"use client";

import { MdOutlineInbox } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

export const organizationMenuItems = [
    {
        title: "Richieste volontariato",
        url: "/dashboard/organization",
        icon: MdOutlinePostAdd,
        className: "md:inline hidden"
    },
    {
        title: "Messaggi",
        url: "/message/organization",
        icon: MdOutlineInbox,
        className: "md:inline hidden"

    },
    {
        title: "Profilo",
        url: "/profile/organization",
        icon: MdOutlineAccountCircle,
        className: "md:inline hidden"
    },
];
