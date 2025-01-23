import { Logo } from '@/components/refactored/landing/Logo';

/**
 * Header component for the landing page.
 *
 * This component renders the header section of the landing page, which includes:
 * - A logo that is centered on smaller screens or aligned to the left on larger screens.
 * - Padding and margin adjustments to ensure proper spacing on different screen sizes.
 *
 * The header is responsive and adjusts its layout and padding across various breakpoints:
 * - Centered on small screens.
 * - Aligned left on larger screens (e.g., `sm`, `md`, `lg`, `xl`).
 */
export function Header() {
    return (
        <header className="w-full flex items-center justify-center sm:justify-start px-8 xl:pl-16 pt-[4.5rem] sm:pt-24 md:pt-16 lg:pt-8 xl:pt-12 pb-8 xl:pb-1">
            <Logo />
        </header>
    );
}