// next.config.js
module.exports = {
  output: 'export',
  images: {
    domains: ['admin.desh365.top', 'api.aladhan.com', 'news-nextjs-phi.vercel.app', 'newsportalnextjs.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'news-nextjs-phi.vercel.app',
        port: '',
        pathname: '/public/storage/post-image/**',
      },
    ],
  },
  // Any other configurations you need
};
