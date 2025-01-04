import { useBasePath } from '@/hooks/useBasePath';
import { Header } from '@/components/layout/Header';
import {Hero} from "@/components/ui/Hero";

export default function Home() {
    const basePath = useBasePath();

    return (
        <div className="w-full h-screen bg-cover bg-center relative">
            <Header />
            <Hero />

            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
                style={{
                    backgroundImage: `url(${basePath}/background.png)`,
                }}
            ></div>
        </div>
    );
}