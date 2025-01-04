import { ImageWrapper } from '@/components/ui/ImageWrapper';

export function Logo() {
    return (
        <div className="max-w-full h-auto">
            <ImageWrapper
                src="/header-logo.svg"
                alt="Logo"
                width={223}
                height={87}
            />
        </div>
    );
}
