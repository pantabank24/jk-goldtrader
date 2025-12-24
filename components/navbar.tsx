"use client";

import React, { useState, useEffect } from "react";

interface Props {
  isTransparent?: boolean;
}

const ModernNavbar = ({ isTransparent }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300     ${
        isTransparent
          ? isScrolled
            ? "bg-[#0f2443]/80 backdrop-blur-lg shadow-lg border-b border-yellow-500"
            : "bg-transparent"
          : "bg-[#0f2443]/80 backdrop-blur-lg shadow-lg border-b border-yellow-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            {isTransparent ? (
              isScrolled ? (
                <div className=" flex flex-row items-center">
                  <img src="/images/JKLOGO.png" alt="logo" className=" w-8" />
                  <div className=" flex flex-col">
                    <span className="font-bold  text-xl ml-3 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
                      KK หลอมทองหาดใหญ่
                    </span>
                    <span className="font-bold  text-xs ml-3 mt-[-5] bg-gradient-to-b from-yellow-100 to-yellow-600 bg-clip-text text-transparent">
                      รับซื้อ - หลอม ทอง เงิน นาค
                    </span>
                  </div>
                </div>
              ) : null
            ) : (
              <div className=" flex flex-row items-center">
                <img src="/images/JKLOGO.png" alt="logo" className=" w-8" />
                <div className=" flex flex-col">
                  <span className="font-bold  text-xl ml-3 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
                    KK หลอมทองหาดใหญ่
                  </span>
                  <span className="font-bold  text-xs ml-3 mt-[-5] bg-gradient-to-b from-yellow-100 to-yellow-600 bg-clip-text text-transparent">
                    รับซื้อ - หลอม ทอง เงิน นาค
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 bg-white/20  backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
            <a
              href="https://www.facebook.com/kkgoldhatyai"
              className="w-8 h-8 flex items-center justify-center rounded-full   hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook.png"
                alt="facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://lin.ee/XukDRz8"
              className="w-8 h-8 flex items-center justify-center rounded-full  hover:bg-white/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/line.png" alt="line" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
