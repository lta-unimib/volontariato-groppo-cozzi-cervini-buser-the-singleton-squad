"use client";

import {organizationMenuItems} from "@/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import {Page} from "@/components/layout/Page";
import {MdOutlineAdd} from "react-icons/md";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <Page>
            <div className="flex-1 my-4">
                <Button
                    variant="default"
                    className="fixed bottom-4 right-4 z-50 p-4 rounded-full h-20 w-20"
                    size="icon"
                    onClick={() => router.push("../offer")}
                >
                    <MdOutlineAdd/>
                </Button>
            </div>
            <div className="flex w-full h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={organizationMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}>
                        <div>
                            {/*put here some children content to be displayed side by side with the sidebar*/}
                        </div>
                    </SidebarLayout>
                </div>
            </div>
        </Page>
);
}