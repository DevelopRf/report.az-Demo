/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.report.az',
        port: '',
        pathname: '/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'report.az',
        port: '',
        pathname: '/public/images/**',
      },
      {
        protocol: 'https',
        hostname: 'swiperjs.com',
        port: '',
        pathname: '/demos/images/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpaperaccess.com',
        port: '',
        pathname: '/full/**'
      }

    ]
  }
}