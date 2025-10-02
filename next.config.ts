import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otimizações para navegação fluida
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Melhorar performance de navegação
  reactStrictMode: true,
  
  // Otimizar imagens
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
