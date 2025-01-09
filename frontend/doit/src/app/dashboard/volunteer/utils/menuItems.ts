"use client";

import { MdOutlineInbox } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

export const menuItems = [
    {
        title: "Opportunità",
        url: "#",
        icon: MdOutlineDashboardCustomize,
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