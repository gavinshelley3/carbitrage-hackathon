/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ksl.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.iconpacks.net',
        port: '',
        pathname:'/**'
      }
    ]
  }
}

module.exports = nextConfig
