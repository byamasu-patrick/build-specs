/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "hsrlevwzkmfwoorzejrp.supabase.co",
    ],
  },
};

module.exports = nextConfig;
