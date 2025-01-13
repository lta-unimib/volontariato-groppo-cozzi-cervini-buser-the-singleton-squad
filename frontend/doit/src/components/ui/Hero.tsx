"use client"

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { ImageWrapper } from './ImageWrapper';
import { Button } from "@/components/ui/Button";
import { MdOutlineAccountCircle, MdOutlineBusiness } from "react-icons/md";
import { GITHUB_PAGES, API_BASE_LINK } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import {Capacitor} from "@capacitor/core";
import {Browser} from "@capacitor/browser";

type UserType = "volunteer" | "organization";

export function Hero() {
    const theme = useTheme();
    const heroIllustrationSrc = theme === 'dark' ? "/hero-illustration-dark.svg" : "/hero-illustration-light.svg";
    const { push } = useRouter();

    const handleButtonClick = async (userType: UserType) => {
        const uuid = uuidv4();
        const redirectUrl = `${API_BASE_LINK}/authentication/${userType}/${uuid}`;

        let browserWindow;

        if (Capacitor.isNativePlatform()) {
            await Browser.open({ url: redirectUrl });
        } else {
            browserWindow = window.open(redirectUrl, "_blank");
        }

        let response;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                console.log("Making request to:", `${API_BASE_LINK}/authentication/status/${uuid}`);
                const res = await fetch(`${API_BASE_LINK}/authentication/status/${uuid}`);
                console.log("Fetch response status:", res.status);
                if (res.ok) {
                    response = await res.json();
                    console.log("Fetch response data:", response);
                } else {
                    console.error("Fetch failed with status:", res.status);
                }
            } catch (error) {
                console.error("Error during polling:", error);
            }

        } while (!response || !response.data || !response.data.redirectPath || !response.data.authToken || !response.data.userId);

        if (response?.status === 200 && response.data) {
            const { redirectPath, authToken, userId } = response.data;

            if (redirectPath && authToken && userId) {
                if (Capacitor.isNativePlatform()) {
                    await Browser.close();
                } else if (browserWindow) {
                    browserWindow.close();
                }

                if (redirectPath === "/dashboard/volunteer/") {
                    push("/dashboard/volunteer/");
                } else if (redirectPath === "/dashboard/organization/") {
                    push("/dashboard/organization/");
                } else if (redirectPath === "/form/volunteer/") {
                    const volunteerQuery = new URLSearchParams({
                        authToken: authToken,
                        userId: userId,
                    }).toString();
                    push(`/form/volunteer/?${volunteerQuery}`);
                } else if (redirectPath === "/form/organization/") {
                    const organizationQuery = new URLSearchParams({
                        token: authToken,
                        authId: userId,
                    }).toString();
                    push(`/form/organization/?${organizationQuery}`);
                } else {
                    console.error("Unknown redirectPath:", redirectPath);
                }
            } else {
                console.log("Incomplete data, continuing polling...");
            }
        } else {
            console.error("Registration failed or incomplete");
        }
    };

    return (
        <div className="relative flex-grow flex flex-col items-center justify-start md:justify-center px-4 md:px-8">
            <div className="max-w-none w-full text-center md:text-left md:flex md:items-center md:gap-8">
                <div className="flex justify-center mb-1 md:mb-0 md:w-1/2 p-6 md:p-10">
                    {GITHUB_PAGES ? (
                        <ImageWrapper
                            src="/hero-illustration-light.svg"
                            alt="Hero illustration"
                            width={600}
                            height={400}
                        />
                    ) : (
                        <Image
                            src={heroIllustrationSrc}
                            alt="Hero illustration"
                            width={600}
                            height={400}
                            priority
                        />
                    )}
                </div>
                <div className="flex flex-col items-center md:items-start md:w-1/2">
                    <p className={`text-2xl md:text-4xl ${theme === "dark" ? "text-white" : "text-[var(--neutral-color-neutral-1000)]"} mb-8 md:mb-12`}>
                        Mettiamo in contatto organizzazioni di volontariato e volontari in Lombardia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center sm:gap-2 md:gap-4 lg:gap-6 md:items-start">
                        <Button
                            variant="default"
                            size="default"
                            className="w-full lg:hidden"
                            onClick={() => handleButtonClick("volunteer")}
                        >
                            <MdOutlineAccountCircle className="mr-2" />
                            Volontario
                        </Button>
                        <Button
                            variant="default"
                            size="lg"
                            className="w-full hidden lg:inline-flex"
                            onClick={() => handleButtonClick("volunteer")}
                        >
                            <MdOutlineAccountCircle className="mr-2" />
                            Volontario
                        </Button>

                        <Button
                            variant="secondary"
                            size="default"
                            className="w-full lg:hidden"
                            onClick={() => handleButtonClick("organization")}
                        >
                            <MdOutlineBusiness className="mr-2" />
                            Organizzazione
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="w-full hidden lg:inline-flex"
                            onClick={() => handleButtonClick("organization")}
                        >
                            <MdOutlineBusiness className="mr-2" />
                            Organizzazione
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}