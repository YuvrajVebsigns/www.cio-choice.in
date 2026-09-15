import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.core-mediagroup.com' },
      { protocol: 'https', hostname: 'coremediagroup.sgp1.digitaloceanspaces.com' },
      { protocol: 'https', hostname: 'ciochoice.com' },
      { protocol: 'https', hostname: 'www.cio-choice.in' },
      { protocol: 'https', hostname: 'cio-choice.in' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'mea.cio-choice.com' },
      { protocol: 'https', hostname: 'ciocrown.com' },
      { protocol: 'https', hostname: 'ciopowerlist.com' },
      { protocol: 'https', hostname: 'www.ciopowerlist.com' },
      { protocol: 'https', hostname: 'cioangel.com' },
      { protocol: 'https', hostname: 'cioangelnetwork.com' },
      { protocol: 'https', hostname: 'cxo-capital.com' },
      { protocol: 'http', hostname: 'www.cio-choice.in' },
      { protocol: 'http', hostname: 'cio-choice.in' },
    ],
  },
};

export default nextConfig;
