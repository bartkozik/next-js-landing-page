import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },


};

export default nextConfig;
