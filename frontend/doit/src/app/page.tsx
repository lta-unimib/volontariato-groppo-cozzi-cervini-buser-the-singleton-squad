const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Home() {
    return (
        <div
            className="w-full h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${basePath}/background.png)`,
            }}
        ></div>
    );
}
