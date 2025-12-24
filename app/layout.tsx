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
import AddToHomeScreenPrompt from "@/components/AddToHomeScreenPrompt";

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
      url: "https://kkgold.com/images/banner2.png",
      width: 1200,
      height: 630,
    },
  },
  facebook: {
    appId: "877",
  },
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffd700" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="description"
          content="แอปเทรดทองคำ KK หลอมทอง Progressive Web App"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  `,
          }}
        />
      </head>
      <title>KK หลอมทอง | เช็คราคาทอง ตรวจราคาทอง ประเมินราคาทอง</title>
      <meta name="description" content="คำอธิบายของเว็บเพจนี้" />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontKanit.variable}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* <AddToHomeScreenPrompt/> */}

            <main className="">
              {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-10 flex-col bg-[#14100b]">
              <div className=" flex flex-row gap-x-2">
                <img
                  className=" rounded-full w-12 h-12 object-cover"
                  alt="jkChill"
                  src="/images/JKLOGO.png"
                />
                <div className=" flex flex-col">
                  <span className="text-default-600 text-lg bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                    KK หลอมทองหาดใหญ่
                  </span>
                  <span className="text-default-600 text-sm">
                    เปิดวันจันทร์-เสาร์ เวลา 9.00 - 18.00
                  </span>
                </div>
              </div>
              <div className="  grid grid-cols-1 gap-x-2 gap-y-2 my-2 ">
                <Button
                  color="primary"
                  variant="flat"
                  as="a"
                  radius="full"
                  href="tel:0648282624"
                >
                  โทร 0648282624
                </Button>
                {/* <Button color="primary" variant="faded" as="a" radius="full"  target="_blank" href="https://maps.app.goo.gl/zFnoEgPjEydyLTQg6?g_st=il">
                  พิกัดร้าน : Google Maps
                </Button> */}
              </div>

              <div className="flex items-center gap-1 text-current">
                <span className="text-default-600">Copyright</span>
                <p className=" font-bold bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
                  © 2025 KK หลอมทอง
                </p>
              </div>
              <div className="flex items-center gap-1 text-current">
                <p className="text-primary text-xs">
                  All Right Reserved | Powered by pantadevs
                </p>
              </div>
              <div className="flex items-center gap-1 text-current mb-16">
                <p className="text-primary text-xs">
                  1.5.1 (September 5, 2025 Latest)
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
