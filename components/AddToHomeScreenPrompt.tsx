"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@heroui/react";

const AddToHomeScreenPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
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

  if (!showPrompt) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: '#fffbe6', border: '1px solid #ffd700', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <span style={{ color: '#bfa100', fontWeight: 600, marginRight: 16 }}>เพิ่ม JK Goldtrader ลงหน้าจอหลักเพื่อเข้าใช้งานสะดวกยิ่งขึ้น!</span>
        <Button color="warning" onClick={handleAddToHomeScreen}>เพิ่มเข้าหน้าจอ</Button>
      </div>
    </div>
  );
};

export default AddToHomeScreenPrompt;
