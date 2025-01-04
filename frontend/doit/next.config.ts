import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    assetPrefix: process.env.GITHUB_PAGES ? `/${process.env.REPOSITORY_NAME}` : '',
    basePath: process.env.GITHUB_PAGES ? `/${process.env.REPOSITORY_NAME}` : '',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;