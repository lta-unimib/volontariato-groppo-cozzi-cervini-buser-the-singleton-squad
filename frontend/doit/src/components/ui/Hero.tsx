"use client"

import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { ImageWrapper } from './ImageWrapper';
import { CustomButton } from "@/components/ui/CustomButton";
import { MdOutlineAccountCircle, MdOutlineBusiness } from "react-icons/md";
import { GITHUB_PAGES } from "@/utils/constants";
import Link from "next/link";  // Importing Link from next

export function Hero() {
    const theme = useTheme();
    const heroIllustrationSrc = theme === 'dark' ? "/hero-illustration-dark.svg" : "/hero-illustration-light.svg";

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
                        />
                    )}
                </div>
                <div className="flex flex-col items-center md:items-start md:w-1/2">
                    <p className={`text-2xl md:text-4xl ${theme === "dark" ? "text-white" : "text-[var(--neutral-color-neutral-1000)]"} mb-8 md:mb-12`}>
                        Mettiamo in contatto organizzazioni di volontariato e volontari in Lombardia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 items-center sm:gap-2 md:gap-4 lg:gap-6 md:items-start">
                        <Link href="/form/volunteer">
                            <CustomButton
                                variant="default"
                                size="default"
                                className="lg:hidden"
                            >
                                <MdOutlineAccountCircle />
                                Volontario
                            </CustomButton>
                        </Link>
                        <Link href="/form/volunteer">
                            <CustomButton
                                variant="default"
                                size="lg"
                                className="hidden lg:inline-flex"
                            >
                                <MdOutlineAccountCircle />
                                Volontario
                            </CustomButton>
                        </Link>
                        <Link href="/form/volunteer">
                            <CustomButton
                                variant="secondary"
                                size="default"
                                className="lg:hidden"
                            >
                                <MdOutlineBusiness />
                                Organizzazione
                            </CustomButton>
                        </Link>
                        <Link href="/form/volunteer">
                            <CustomButton
                                variant="secondary"
                                size="lg"
                                className="hidden lg:inline-flex"
                            >
                                <MdOutlineBusiness />
                                Organizzazione
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}