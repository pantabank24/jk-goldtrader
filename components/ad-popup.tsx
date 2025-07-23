"use client";

import { Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // รีเซ็ต scroll ทุกครั้งเมื่อ component mount
    document.body.style.overflow = "";

    const hasClosed = localStorage.getItem("515444321");
    if (!hasClosed) {
      setShowPopup(true);
      document.body.style.overflow = "hidden";

      // delay เพื่อให้ transition ทำงานตอนเปิด popup
      setTimeout(() => {
        setIsOpening(true);
      }, 10);
    }
  }, []);

  useEffect(() => {
    // cleanup scroll ถ้า popup ปิด
    if (!showPopup) {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  const handleClose = (remember: boolean) => {
    if (remember) {
      localStorage.setItem("515444321", "true");
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
