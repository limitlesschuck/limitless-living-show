/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nextjs-app",
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "artwork.captivate.fm",
      },
      {
        protocol: "https",
        hostname: "podcasts.captivate.fm",
      },
    ],
  },
};

export default nextConfig;
