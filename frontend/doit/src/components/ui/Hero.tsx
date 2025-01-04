import { ImageWrapper } from './ImageWrapper';

export function Hero() {
    return (
        <div className="relative h-auto flex flex-col items-center justify-start px-8 md:px-16">
            <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center mb-8">
                    <ImageWrapper
                        src="/hero-illustration.svg"
                        alt="Un'illustrazione che rappresenta il nostro servizio per mettere in contatto volontari e organizzazioni di volontariato"
                        width={336}
                        height={359}
                    />
                </div>
                <p className="text-2xl text-[var(--neutral-color-neutral-1000)]">
                    Mettiamo in contatto organizzazioni di volontariato e volontari in Lombardia.
                </p>
            </div>
        </div>
    );
}