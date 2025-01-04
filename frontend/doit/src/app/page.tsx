import { useBasePath } from '@/hooks/useBasePath';

export default function Home() {
    const basePath = useBasePath();

    return (
        <div
            className="w-full h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${basePath}/background.png)`,
            }}
        ></div>
    );
}
