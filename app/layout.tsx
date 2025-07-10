import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontKanit } from "@/config/fonts";
import { Button } from "@heroui/button";
import Image from "next/image";
import ModernNavbar from "@/components/navbar";
import AdPopup from "@/components/ad-popup";
import { TabBars } from "@/components/tabbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: {
      url: "https://jk-goldtrader.com/images/jk-banner.jpg",
      width: 1200,
      height: 630,
    }
  },
  facebook: {
    appId: "877"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <title>JK Goldtrader | เช็คราคาทอง ตรวจราคาทอง ประเมินราคาทอง</title>
      <meta name="description" content="คำอธิบายของเว็บเพจนี้" />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontKanit.variable}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <AdPopup/>
            <main className="">
            {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-10 flex-col bg-[#14100b]">
              <div className=" flex flex-row gap-x-2">
                <Image
                  className=" rounded-full"
                  alt="jkChill"
                  src="/images/owner.png"
                  width={50}
                  height={50}
                />
                <div className=" flex flex-col">
                  <span className="text-default-600 text-lg bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">JK Goldtrader by จ่าคิง ปากพนัง</span>
                  <span className="text-default-600 text-sm">ร้านเปิดทุกวัน 09:30-16:30 (แนะนำให้โทรนัดครับ)</span>
                </div>
              </div>
              <div className="  grid max-sm:grid-cols-1 grid-cols-2 gap-x-2 gap-y-2 my-2 ">
                <Button color="primary" variant="flat" as="a" radius="full" href="tel:0639325566">
                  โทร 063-932-5566 (จ่าคิง)
                </Button>
                <Button color="primary" variant="faded" as="a" radius="full"  target="_blank" href="https://maps.app.goo.gl/zFnoEgPjEydyLTQg6?g_st=il">
                  พิกัดร้าน : Google Maps
                </Button>
              </div>
              
              <div
                className="flex items-center gap-1 text-current"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">JK Goldtrader</p>
              </div>

            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
