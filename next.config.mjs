/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'utfs.io'
          },
          {
              protocol: 'https',
              hostname: 'i.pinimg.com',
              pathname: '/**',
          },
      ],
  },
  

};

export default nextConfig;
