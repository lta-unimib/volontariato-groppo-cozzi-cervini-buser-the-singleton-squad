const basePath = process.env.GITHUB_PAGES ? `/${process.env.REPOSITORY_NAME}` : '';

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