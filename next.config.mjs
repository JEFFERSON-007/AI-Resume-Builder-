/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Required for GitHub Pages to correctly serve index.html files in subdirectories
    trailingSlash: true,
    // Repository name: AI-Resume-Builder-
    basePath: '/AI-Resume-Builder-',
    // assetPrefix is usually not needed when basePath is set, but can be used for CDN
    // assetPrefix: '/AI-Resume-Builder-',
};

export default nextConfig;
