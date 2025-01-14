"use client";

import {organizationMenuItems} from "@/app/dashboard/volunteer/utils/organizationMenuItems";
import SidebarLayout from "@/components/ui/sidebar/SidebarLayout";
import {Page} from "@/components/layout/Page";
import {MdOutlineAdd} from "react-icons/md";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {cn} from "@/lib/utils";

export default function Home() {
    const router = useRouter();

    return (
        <Page>
            <div className="flex w-full h-screen">
                <div className="w-[var(--sidebar-width)]">
                    <SidebarLayout
                        menuItems={organizationMenuItems}
                        header={""}
                        side={"left"}
                        variant={"floating"}
                        collapsible={"icon"}
                    >
                        <div />
                    </SidebarLayout>
                </div>

                <div className="flex-1 my-4">
                    <ScrollArea className="h-full px-8">
                        <div className="space-y-2">
                            {/* Il contenuto principale andrà qui */}
                        </div>
                    </ScrollArea>

                    <Button
                        variant="default"
                        className={cn(
                            "fixed transform z-50 p-4 rounded-full !h-20 !w-20",
                            "left-1/2 -translate-x-1/2 bottom-36",
                            "md:left-auto md:right-4 md:-translate-x-0 md:bottom-4"
                        )}
                        size="icon"
                        onClick={() => router.push("../offer")}
                    >
                        <MdOutlineAdd className="!h-6 !w-6" />
                    </Button>

                </div>
            </div>
        </Page>
    );
}