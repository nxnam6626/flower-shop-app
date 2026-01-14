import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,

    images: {
        qualities: [75, 85],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            // Thêm Unsplash vào đây
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            // Pravatar cho Avatar
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;