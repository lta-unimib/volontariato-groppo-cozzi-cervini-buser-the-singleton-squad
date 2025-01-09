"use client";

import { MdOutlineInbox } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

export const menuItems = [
    {
        title: "Offerte volontariato",
        url: "#",
        icon: MdAssignmentAdd,
        className: "md:inline hidden"
    },
    {
        title: "Messaggi",
        url: "#",
        icon: MdOutlineInbox,
        className: "md:inline hidden"

    },
    {
        title: "Profilo",
        url: "#",
        icon: MdOutlineAccountCircle,
        className: "md:inline hidden"
    },
];
