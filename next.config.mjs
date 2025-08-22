/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/produtos/:path*",
        destination: "https://ms-ecommerce.hiper.com.br/api/v1/produtos/:path*",
      },
    ];
  },
  images: {
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
