import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontKanit } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Button } from "@heroui/button";
import Image from "next/image";
import { Providers } from "../providers";
import { NavbarCus } from "@/components/navbar_cus";

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
      url: "https://jk-goldtrader-rhfc.vercel.app/images/jk-banner.jpg",
      width: 1200,
      height: 630,
    }
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

  const Menu = [
    {
      id: 0,
      name: "หน้าแรก"
    },
    {
      id: 1,
      name: "ขายทอง"
    },
    {
      id: 2,
      name: "รายการขาย"
    }
  ]
  
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <title>JK Goldtrader | เช็คราคาทอง ตรวจราคาทอง ประเมินราคาทอง</title>
      <meta name="description" content="คำอธิบายของเว็บเพจนี้" />
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontKanit.variable}`}
      >
        <Providers themeProps={{ attribute: "class", forcedTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarCus />
            <main className="">
              <div className=" flex flex-row h-screen pt-24 pb-4 px-4 gap-6">
                <div className="  h-auto w-60 bg-gray-100 rounded-3xl flex flex-col gap-y-2 p-3 shadow-md border-1 max-lg:hidden">
                  {
                    Menu.map((i) => 
                      i.id == 0
                        ? <Button className={` flex justify-start bg-gradient-to-t from-[#51070e]  to-[#89111c] text-white font-semibold h-14 rounded-2xl`}  key={i.id}>{i.name}</Button>
                        : <Button className={` flex justify-start bg-white text-[#710711] font-semibold border-1 border-[#710711] h-14 rounded-2xl`}  key={i.id}>{i.name}</Button>
                    )
                  }
                </div>
                <div className="">
                  {children}
                </div>
              </div>
            </main>
            <footer className="w-full flex items-center justify-center py-10 flex-col bg-[#14100b]">
              <div className=" flex flex-row gap-x-2">
                <Image
                  className=" rounded-full"
                  alt="jkChill"
                  src="/images/jk-chilling.png"
                  width={50}
                  height={50}
                />
                <div className=" flex flex-col">
                  <span className="text-default-600 text-lg">JK Goldtrader by จ่าคิง ปากพนัง</span>
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
