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
      }

    ]
  }
}