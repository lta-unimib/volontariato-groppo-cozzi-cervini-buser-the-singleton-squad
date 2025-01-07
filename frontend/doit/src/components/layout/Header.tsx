import { Logo } from '@/components/ui/Logo';

export function Header() {
    return (
        <header className="w-full flex items-center justify-center sm:justify-start px-8 xl:pl-16 pt-[4.5rem] sm:pt-24 md:pt-16 lg:pt-8 xl:pt-12 pb-8 xl:pb-1">
            <Logo />
        </header>
    );
}