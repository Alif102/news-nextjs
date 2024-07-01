module.exports = {
  images: {
    domains: ['admin.desh365.top' , 'http://api.aladhan.com' , 'https://news-nextjs-phi.vercel.app' ,  'https://newsportalnextjs.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://news-nextjs-phi.vercel.app',
        port: '',
        pathname: '/public/storage/post-image/**',
      },
    ],
  },
};
