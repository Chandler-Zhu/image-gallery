/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['czpgrilrviuhomkmpomj.supabase.co'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
