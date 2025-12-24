"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";

const AddToHomeScreenPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const hasClosed = localStorage.getItem("22222211212");
    if (!hasClosed) {
      setShowPopup(true);
      if (!/iphone|ipad|ipod/i.test(window.navigator.userAgent)) {
        document.body.style.overflow = "hidden";
      }

      // delay เพื่อให้ transition ทำงานตอนเปิด popup
      setTimeout(() => {
        setIsOpening(true);
      }, 10); // เล็กน้อยพอให้ DOM render ก่อน
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(userAgent);
    setIsIos(isIosDevice);
    // Detect if app is already installed (standalone)
    const standalone =
      (window.navigator as any).standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches;
    setIsInStandaloneMode(standalone);

    // Android: Listen for beforeinstallprompt
    const handler = (e: any) => {
      console.log("beforeinstallprompt fired", e);
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAddToHomeScreen = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleClose = () => {
    localStorage.setItem("22222211212", "true");
    document.body.style.overflow = "";
    setIsClosing(true);
    setIsOpening(false);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  if (!showPopup) return null;

  // iOS: Show custom instructions if not in standalone mode
  if (isIos && !isInStandaloneMode) {
    return (
      <div
        className={` fixed top-16 z-40 px-2 pt-2 flex justify-center w-full  ${
          isClosing
            ? "opacity-0 scale-95"
            : isOpening
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        <div className="backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl p-4 shadow-md flex flex-col items-center">
          <div className=" flex flex-row w-full gap-x-2 items-center text-sm">
            <div>
              <Image
                src="/images/jk-icon.jpg"
                alt="jk-icon"
                width={80}
                height={80}
                className=" rounded-xl"
              />
            </div>
            <span className=" font-semibold mr-4">
              เพิ่ม KK หลอมทอง ลงหน้าจอหลักบน iOS: กด{" "}
              <span className="inline-block px-1">แชร์</span>{" "}
              <svg
                className="inline w-5 h-5 align-text-bottom"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>{" "}
              แล้วเลือก <b>"เพิ่มไปยังหน้าจอโฮม"</b>
            </span>
          </div>
          <Button
            color="warning"
            className=" w-full backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl text-red-500 mt-2"
            onClick={handleClose}
          >
            ไม่ต้องแสดงอีก
          </Button>
        </div>
      </div>
    );
  }

  // Android: Show prompt if available
  if (!isIos && showPrompt) {
    return (
      <div
        className={` fixed top-16 z-40 px-2 pt-2 flex justify-center w-full  ${
          isClosing
            ? "opacity-0 scale-95"
            : isOpening
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
        }`}
      >
        <div className="backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl p-4 shadow-md flex flex-col items-center">
          <div className=" flex flex-row w-full gap-x-2 items-center text-sm">
            <div>
              <Image
                src="/images/jk-icon.jpg"
                alt="jk-icon"
                width={80}
                height={80}
                className=" rounded-xl"
              />
            </div>
            <span className=" font-semibold mr-4">
              เพิ่ม KK หลอมทอง ลงหน้าจอหลักเพื่อเข้าใช้งานสะดวกยิ่งขึ้น!
            </span>
          </div>
          <div className=" flex flex-row w-full gap-x-2">
            <Button
              color="warning"
              className=" w-full backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl text-red-500 mt-2"
              onClick={handleClose}
            >
              ไม่ต้องแสดงอีก
            </Button>
            <Button
              className=" w-full backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/10 to-blue-500/40 rounded-xl mt-2"
              onClick={handleAddToHomeScreen}
            >
              เพิ่มเลย
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AddToHomeScreenPrompt;
