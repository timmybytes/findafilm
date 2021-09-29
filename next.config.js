/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tmdb.org', 'image.tmdb.org', 'localhost:3000'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
}
