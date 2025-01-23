import { Page } from '@/components/Page';
import { Header } from '@/components/refactored/landing/Header';
import { Hero } from "@/components/refactored/landing/Hero";

export default function Home() {
    return (
        <Page>
            <Header />
            <Hero />
        </Page>
    );
}