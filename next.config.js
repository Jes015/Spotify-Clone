/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'misc.scdn.co',
                pathname: '/**',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/**',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
