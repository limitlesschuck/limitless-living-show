/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nextjs-app",
  env: {
    // Expose NEXTAUTH_URL to client-side code so next-auth knows the basePath
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
