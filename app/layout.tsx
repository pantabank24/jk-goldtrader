import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontKanit } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Button } from "@heroui/button";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
      <head />
      <title>JK Goldtrader | เช็คราคาทอง ตรวจราคาทอง ประเมินราคาทอง</title>
      <meta name="description" content="คำอธิบายของเว็บเพจนี้" />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontKanit.variable}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="">
            {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-5 flex-col bg-[#14100b]">
              <span className="text-default-600 text-lg">JK Goldtrader by จ่าคิง ปากพนัง</span>
              <span className="text-default-600 text-sm">ร้านเปิดทุกวัน 09:30-16:30 (แนะนำให้โทรนัดครับ)</span>
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
                <p className="text-primary">JK Goldtraders</p>
              </div>

            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
