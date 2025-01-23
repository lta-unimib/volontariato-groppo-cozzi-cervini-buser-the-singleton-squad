"use client";

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MdOutlineAccountCircle, MdOutlineBusiness } from "react-icons/md";
import Link from "next/link";

export function Hero() {
    const theme = useTheme();
    const heroIllustrationSrc = theme === 'dark' ? "/hero-illustration-dark.svg" : "/hero-illustration-light.svg";

    return (
        <div className="relative flex-grow flex flex-col items-center justify-start md:justify-center px-4 md:px-8">
            <div className="max-w-none w-full text-center md:text-left md:flex md:items-center md:gap-8">
                <div className="flex justify-center mb-1 md:mb-0 md:w-1/2 p-6 md:p-10">
                    <Image
                        src={heroIllustrationSrc}
                        alt="Hero illustration"
                        width={600}
                        height={400}
                        priority
                    />
                </div>
                <div className="flex flex-col items-center md:items-start md:w-1/2">
                    <p className={`text-2xl md:text-4xl ${theme === "dark" ? "text-foreground" : "text-[var(--neutral-color-neutral-1000)]"} mb-8 md:mb-12`}>
                        Mettiamo in contatto organizzazioni di volontariato e volontari in Lombardia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center sm:gap-2 md:gap-4 lg:gap-6 md:items-start">
                        <Link href="/auth/volunteer">
                            <Button
                                variant="default"
                                size="default"
                                className="w-full lg:hidden"
                            >
                                <MdOutlineAccountCircle className="mr-2" />
                                Volontario
                            </Button>
                            <Button
                                variant="default"
                                size="lg"
                                className="w-full hidden lg:inline-flex"
                            >
                                <MdOutlineAccountCircle className="mr-2" />
                                Volontario
                            </Button>
                        </Link>
                        <Link href="/auth/organization/">
                            <Button
                                variant="secondary"
                                size="default"
                                className="w-full lg:hidden"
                            >
                                <MdOutlineBusiness className="mr-2" />
                                Organizzazione
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="w-full hidden lg:inline-flex"
                            >
                                <MdOutlineBusiness className="mr-2" />
                                Organizzazione
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
