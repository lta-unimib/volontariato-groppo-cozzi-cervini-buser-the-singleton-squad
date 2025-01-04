import type { NextConfig } from 'next'

const repositoryName = 'volontariato-groppo-cozzi-cervini-buser-the-singleton-squad';

const nextConfig: NextConfig = {
    output: 'export',
    assetPrefix: process.env.GITHUB_PAGES ? `/${repositoryName}` : '',
    basePath: process.env.GITHUB_PAGES ? `/${repositoryName}` : '',
    images: {
        unoptimized: true,
    },
}

export default nextConfig
