/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "tailwindui.com" },
      { hostname: "www.allrecipes.com" },
      { hostname: "www.chilipeppermadness.com" },
      { hostname: "images.pexels.com" },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
