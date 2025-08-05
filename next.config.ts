const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pzwfxlohnoiemrlczoyt.supabase.co',
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
