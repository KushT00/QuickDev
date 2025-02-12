/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['placehold.jp'], // Add the allowed image domain here
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
