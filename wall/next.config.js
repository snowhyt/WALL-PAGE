/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lquxnjdzuzsrnuoybgvk.supabase.co'],
  },
  eslint: {
    // ✅ This disables ESLint ONLY when running `next build`
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
