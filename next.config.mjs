/** @type {import('next').NextConfig} */
const nextConfig = {
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
