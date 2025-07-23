"use client";

import { Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";

const LOCALSTORAGE_KEY = "515444321";

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  // ✅ รีเซ็ต scroll ทุกครั้งที่ component mount
  useEffect(() => {
    const hasClosed = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!hasClosed) {
      setShowPopup(true);
      setTimeout(() => {
        setIsOpening(true);
        document.body.style.overflow = "hidden"; // ✅ ต้องทำหลังเปิด
      }, 10);
    } else {
      // ✅ ถ้าเคยปิดไว้แล้ว ก็ให้ reset scroll แน่นอน
      document.body.style.overflow = ""; // 💥 critical fix
    }
  }, []);

  // ✅ cleanup scroll ทันทีที่ popup ปิด
  useEffect(() => {
    if (!showPopup) {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  const handleClose = (remember: boolean) => {
    if (remember) {
      localStorage.setItem(LOCALSTORAGE_KEY, "true");
    }

    setIsClosing(true);
    setIsOpening(false);

    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };

  const handleToggle = () => {
    setIsCheck(!isCheck);
  };

  const handleCloser = () => {
    handleClose(isCheck);
  };

  const handleBackgroundClick = () => {
    handleClose(isCheck);
  };

  if (!showPopup) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className={`fixed inset-0 z-50 bg-black backdrop-blur-sm bg-opacity-60 flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl shadow-lg p-4 max-w-sm w-full relative transform transition-all duration-300 ${
          isClosing
            ? "opacity-0 scale-95"
            : isOpening
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
      >
        <img
          src="/images/515444321_122134709534668442_6972218340899068794_n.jpg"
          alt="โฆษณา"
          className="rounded-lg mb-4 w-full cursor-pointer"
        />
        <div className="flex flex-row gap-2">
          <div className="bg-white/30 w-52 flex items-center justify-center rounded-2xl">
            <Checkbox
              isSelected={isCheck}
              onValueChange={handleToggle}
              color="warning"
            >
              ไม่แสดงอีก
            </Checkbox>
          </div>
          <button
            onClick={handleCloser}
            className="bg-red-500/70 text-white px-4 py-2 rounded-2xl hover:bg-red-600 w-full"
          >
            ปิดโฆษณา
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPopup;
