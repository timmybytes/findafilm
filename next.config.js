/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['tmdb.org', 'image.tmdb.org', 'localhost:3000'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  publicRuntimeConfig: {
    API_KEY: '06cbaaa0bc746189acc7b951e418cf85',
  },
}
