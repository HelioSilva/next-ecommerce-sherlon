import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { nameStore } from "@/const/name";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: nameStore,
  description:
    "Eternize seus momentos com as joias mais refinadas de Alagoas. Alianças, anéis e colares em ouro 18k para celebrar o amor. Conheça nossa coleção.",
  keywords: [
    "aliança ouro 18k maceió",
    "aliança de casamento alagoas",
    "aliança dourada maceió",
    "aliança feminina ouro 18k",
    "aliança masculina ouro",
    "comprar aliança maceió",
    "melhor joalheria para alianças maceió",
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
