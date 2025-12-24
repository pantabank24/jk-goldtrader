"use client";

import { addToast, Tab, Tabs, Toast } from "@heroui/react";
import {
  AlignVerticalSpaceBetween,
  Calculator,
  ChartBar,
  Coins,
  Diamond,
  DiscAlbum,
  House,
  Layers,
  NotepadText,
} from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  tab: (i: string) => void;
  quotationQty: number;
  error?: any;
}

export const TabBars = ({ tab, quotationQty, error }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ตรวจสอบว่าเลื่อนลงหรือไม่ และต้องเลื่อนลงเกิน 200px
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsScrolled(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleChange = (key: string) => {
    if (error && key === "check") {
      addToast({
        hideIcon: true,
        title: "ไม่สามารถดำเนินการได้",
        description:
          "ขณะนี้ตลาดทองอาจปิด จึงไม่สามารถตรวจราคาทองแบบเรียลไทม์ได้ ขออภัยในความไม่สะดวก",
        variant: "flat",
        color: "warning",
        radius: "lg",
      });
    } else {
      tab(key);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center shadow-md bg-gradient-to-t from-black to-transparent w-full">
      <div
        className={`relative bottom-4 transition-all duration-300 flex items-center justify-center gap-x-2 ${
          isScrolled ? "scale-75" : "scale-100"
        }`}
      >
        <Tabs
          key="default"
          aria-label="Tabs"
          color="warning"
          radius="full"
          size={isScrolled ? "md" : "lg"}
          onSelectionChange={(i) => handleChange(i.toString())}
          classNames={{
            tab: isScrolled ? "h-10" : "h-12",
            tabList:
              "bg-white/10 backdrop-blur-xl border border-white/20 p-2 shadow-2xl",
            tabContent: "text-white",
            cursor:
              "bg-gradient-to-b from-yellow-200 to-yellow-600 heigh-50  backdrop-blur-xl border border-white/50",
          }}
        >
          <Tab
            key="home"
            title={
              isScrolled ? (
                <Calculator />
              ) : (
                <div
                  className={`whitespace-pre-line w-7 ${isScrolled ? "text-xs" : "text-sm"} flex flex-col items-center text-white`}
                >
                  <Calculator size={20} />
                  <div className=" text-[10px]">ทอง</div>
                </div>
              )
            }
          />
          <Tab
            key="silver"
            title={
              isScrolled ? (
                <Coins />
              ) : (
                <div
                  className={`whitespace-pre-line w-7 ${isScrolled ? "text-xs" : "text-sm"} flex flex-col items-center text-white`}
                >
                  <Coins size={20} />
                  <div className=" text-[10px]">เงิน</div>
                </div>
              )
            }
          />
          <Tab
            key="platinum"
            title={
              isScrolled ? (
                <DiscAlbum />
              ) : (
                <div
                  className={`whitespace-pre-line w-7 ${isScrolled ? "text-xs" : "text-sm"} flex flex-col items-center text-white`}
                >
                  <DiscAlbum size={20} />
                  <div className=" text-[7px]">แพลตินัม</div>
                </div>
              )
            }
          />
          <Tab
            key="palladium"
            title={
              isScrolled ? (
                <Diamond />
              ) : (
                <div
                  className={`whitespace-pre-line w-7 ${isScrolled ? "text-xs" : "text-sm"} flex flex-col items-center text-white`}
                >
                  <Diamond size={20} />
                  <div className=" text-[10px]">แพลเลเดียม</div>
                </div>
              )
            }
          />
          <Tab
            key="check"
            title={
              isScrolled ? (
                <ChartBar color="white" />
              ) : (
                <div
                  className={` w-7 ${isScrolled ? "text-xs" : "text-xs"} flex flex-col items-center text-white`}
                >
                  <ChartBar color="white" size={20} />
                  <div className=" text-[10px]">{` ทองหลอม`}</div>
                </div>
              )
            }
          />
          <Tab
            key="quote"
            title={
              isScrolled ? (
                quotationQty > 0 ? (
                  <div
                    className={`bg-red-600 flex items-center justify-center backdrop-blur-xl border border-white/20 rounded-full h-5 w-5`}
                  >
                    <div className={`text-white text-xl`}>{quotationQty}</div>
                  </div>
                ) : (
                  <div className=" bg-white/10 flex items-center justify-center backdrop-blur-xl border border-white/20 rounded-full h-12 w-12">
                    <Layers />
                  </div>
                )
              ) : (
                <div
                  className={` relative whitespace-pre-line w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 p-2 shadow-2xl rounded-full flex flex-row items-center justify-center ${isScrolled ? "text-xs" : "text-xs"}`}
                >
                  <Layers />
                  {quotationQty > 0 ? (
                    <div
                      className={` absolute  top-0 right-0 bg-red-600 rounded-full ml-1 flex items-center justify-center ${isScrolled ? "h-4 w-5" : "h-5 w-5"}`}
                    >
                      <div
                        className={`text-white ${isScrolled ? "text-xs" : "text-sm"}`}
                      >
                        {quotationQty}
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            }
          />
        </Tabs>
      </div>
    </div>
  );
};
