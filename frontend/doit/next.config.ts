import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    reactStrictMode: true,
    assetPrefix: process.env.GITHUB_PAGES === 'true' ? `/${process.env.REPOSITORY_NAME}` : '',
    basePath: process.env.GITHUB_PAGES === 'true' ? `/${process.env.REPOSITORY_NAME}` : '',
    images: {
        unoptimized: true,
    },
    env: {
        GITHUB_PAGES: process.env.GITHUB_PAGES || 'false',
        REPOSITORY_NAME: process.env.REPOSITORY_NAME || '',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
