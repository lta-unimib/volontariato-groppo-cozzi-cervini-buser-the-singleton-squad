import { ImageWrapper } from './ImageWrapper';
import { CustomButton } from "@/components/ui/CustomButton";
import { MdOutlineAccountCircle, MdOutlineBusiness } from "react-icons/md";

export function Hero() {
    return (
        <div className="relative flex-grow flex flex-col items-center justify-start md:justify-center px-4 md:px-8">
            <div className="max-w-none w-full text-center md:text-left md:flex md:items-center md:gap-8">
                <div className="flex justify-center mb-8 md:mb-0 md:w-1/2 md:p-10">
                    <ImageWrapper
                        src="/hero-illustration.svg"
                        alt="Un'illustrazione che rappresenta il nostro servizio per mettere in contatto volontari e organizzazioni di volontariato"
                        width={336}
                        height={359}
                        className="w-full max-w-[336px] h-auto md:max-w-[500px] lg:max-w-[600px]"
                    />
                </div>
                <div className="flex flex-col items-center md:items-start md:w-1/2">
                    <p className="text-2xl md:text-4xl text-[var(--neutral-color-neutral-1000)] mb-8 md:mb-12">
                        Mettiamo in contatto organizzazioni di volontariato e volontari in Lombardia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 items-center sm:gap-2 md:gap-4 lg:gap-6 md:items-start">
                        <CustomButton
                            variant="default"
                            size="default"
                            className="lg:hidden"
                        >
                            <MdOutlineAccountCircle />
                            Volontario
                        </CustomButton>
                        <CustomButton
                            variant="default"
                            size="lg"
                            className="hidden lg:inline-flex"
                        >
                            <MdOutlineAccountCircle />
                            Volontario
                        </CustomButton>
                        <CustomButton
                            variant="secondary"
                            size="default"
                            className="lg:hidden"
                        >
                            <MdOutlineBusiness />
                            Organizzazione
                        </CustomButton>
                        <CustomButton
                            variant="secondary"
                            size="lg"
                            className="hidden lg:inline-flex"
                        >
                            <MdOutlineBusiness />
                            Organizzazione
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}