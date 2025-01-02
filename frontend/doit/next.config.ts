const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Essenziale per entrambi
    },
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
    env: {
        NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
        NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
    },
};

export default nextConfig;
