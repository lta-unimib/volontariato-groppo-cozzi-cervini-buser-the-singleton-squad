"use client";

import { organizationMenuItems } from "@/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import { Page } from "@/components/layout/Page";
import { OfferForm } from "@/app/offer/components/OfferForm";

export default function Home() {
    return (
        <Page>
            <OfferForm />
        </Page>
    );
}
