import { Logo } from '@/components/ui/Logo';

export function Header() {
    return (
        <header className="w-full px-8 pt-[4.5rem] pb-8 flex justify-center md:justify-start items-center">
            <Logo />
        </header>
    );
}