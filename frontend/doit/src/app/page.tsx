import { Header } from '@/components/landing/Header';
import { Hero } from "@/components/landing/Hero";

/**
 * Home page component that renders the landing page content.
 * It includes the header and hero sections.
 *
 * @returns The Home component, displaying the landing page sections.
 */
export default function Home() {
    return (
        <div>
            {/* Renders the header section of the landing page */}
            <Header />
            {/* Renders the hero section of the landing page */}
            <Hero />
        </div>
    );
}
