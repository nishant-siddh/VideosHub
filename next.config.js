/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io',
                pathname: '/v1/storage/buckets/64b00e1003def55a569c/files/**',
                port: '',

            }
        ],
    },
}

module.exports = nextConfig
