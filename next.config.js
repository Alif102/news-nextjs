module.exports = {
  images: {
    domains: ['admin.desh365.top' ,  'https://newsportalnextjs.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.desh365.top',
        port: '',
        pathname: '/public/storage/post-image/**',
      },
    ],
  },
};
