// next.config.js
module.exports = {
  // Specify the output configuration for static site generation
  output: {
    page: 'out',
  },
  images: {
    domains: ['admin.desh365.top', 'api.aladhan.com', 'news-nextjs-phi.vercel.app', 'newsportalnextjs.vercel.app'],
    loader: 'default',
    path: '/_next/image',
  },
};
