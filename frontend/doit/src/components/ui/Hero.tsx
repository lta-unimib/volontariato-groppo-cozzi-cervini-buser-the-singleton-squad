"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { ImageWrapper } from './ImageWrapper';
import { Button } from "@/components/ui/Button";
import { MdOutlineAccountCircle, MdOutlineBusiness } from "react-icons/md";
import { GITHUB_PAGES, API_BASE_LINK } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

type UserType = "volunteer" | "organization";

export function Hero() {
    const theme = useTheme();
    const heroIllustrationSrc = theme === 'dark' ? "/hero-illustration-dark.svg" : "/hero-illustration-light.svg";
    const router = useRouter();

    const handleButtonClick = async (userType: UserType) => {
        const uuid = uuidv4();
        const redirectUrl = `${API_BASE_LINK}/authentication/${userType}/?uuid=${uuid}`;

        window.open(redirectUrl, "_blank");

        let response;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const res = await fetch(`${API_BASE_LINK}/registration/status/${uuid}`);
                if (res.ok) {
                    response = await res.json();
                }
            } catch (error) {
                console.error("Error during polling:", error);
            }
        } while (!response || response.status !== "completed");
        if (response?.redirectPath) {
            switch (response.redirectPath) {
                case "dashboard/volunteer":
                    console.log("Volunteer login successful. Redirecting...");
                    await router.push("/dashboard/volunteer");
                    break;
                case "dashboard/organization":
                    console.log("Organization login successful. Redirecting...");
                    await router.push("/dashboard/organization");
                    break;
                case "form/volunteer":
                    console.log("Volunteer registration successful. Redirecting...");
                    await router.push({
                        pathname: "/form/volunteer",
                        query: {token: response.token, authId: response.authId}
                    });
                    break;
                case "form/organization":
                    console.log("Organization registration successful. Redirecting...");
                    await router.push({
                        pathname: "/form/organization",
                        query: {token: response.token, authId: response.authId}
                    });
                    break;
                default:
                    console.error("Unknown redirectPath:", response.redirectPath);
                    break;
            }
        } else {
            console.error("Registration failed or incomplete");
        }
    }

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