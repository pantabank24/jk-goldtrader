"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@heroui/react";

const AddToHomeScreenPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent;
    const isIosDevice = /iphone|ipad|ipod/i.test(userAgent);
    setIsIos(isIosDevice);
    // Detect if app is already installed (standalone)
    const standalone = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    setIsInStandaloneMode(standalone);

    // Android: Listen for beforeinstallprompt
    const handler = (e: any) => {
      console.log('beforeinstallprompt fired', e);
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAddToHomeScreen = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  // iOS: Show custom instructions if not in standalone mode
  if (isIos && !isInStandaloneMode) {
    return (
      <div className="flex justify-center w-full">
        <div className="bg-yellow-50 border border-yellow-400 rounded-xl p-4 shadow-md flex items-center">
          <span className="text-yellow-700 font-semibold mr-4">
            เพิ่ม JK Goldtrader ลงหน้าจอหลักบน iOS: กด <span className="inline-block px-1">แชร์</span> <svg className="inline w-5 h-5 align-text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 8l-4-4m0 0L8 8m4-4v12" /></svg> แล้วเลือก <b>"เพิ่มไปยังหน้าจอโฮม"</b>
          </span>
        </div>
      </div>
    );
  }

  // Android: Show prompt if available
  if (!isIos && showPrompt) {
    return (
      <div className="flex justify-center w-full">
        <div className="bg-yellow-50 border border-yellow-400 rounded-xl p-4 shadow-md flex items-center">
          <span className="text-yellow-700 font-semibold mr-4">เพิ่ม JK Goldtrader ลงหน้าจอหลักเพื่อเข้าใช้งานสะดวกยิ่งขึ้น!</span>
          <Button color="warning" onClick={handleAddToHomeScreen}>เพิ่มเข้าหน้าจอ</Button>
        </div>
      </div>
    );
  }

  return null;
};

export default AddToHomeScreenPrompt;
