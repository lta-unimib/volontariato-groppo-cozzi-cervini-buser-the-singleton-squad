import { Header } from '@/components/layout/Header';
import {Hero} from "@/components/ui/Hero";

export default function Home() {

    return (
        <div className="w-full h-screen bg-cover bg-center relative">
            <Header />
            <Hero />

            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-[var(--neutral-color-neutral-100)] z-[-1]"
            ></div>
        </div>
    );
}