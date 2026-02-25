/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // If your GitHub repository name is NOT <username>.github.io,
    // you need to set the base path to the repository name.
    // Repository name: AI-Resume-Builder-
    basePath: '/AI-Resume-Builder-',
    assetPrefix: '/AI-Resume-Builder-/',
};

export default nextConfig;
