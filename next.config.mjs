/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https", // http ou https
        hostname: "hiper-gestao.s3.amazonaws.com",
        port: "", // vazio se padrão 80/443
        pathname: "/**", // qualquer caminho
      },
    ],
  },
};

export default nextConfig;
