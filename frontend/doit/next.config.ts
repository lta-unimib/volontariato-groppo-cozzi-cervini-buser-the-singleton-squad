import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    assetPrefix: process.env.GITHUB_PAGES ? '/{repository-name}' : '',
    basePath: process.env.GITHUB_PAGES ? '/{repository-name}' : '',
    images: {
        unoptimized: true,
    },
}

export default nextConfig