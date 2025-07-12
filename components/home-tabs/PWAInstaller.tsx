"use client";
import React from "react";

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showInstall, setShowInstall] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => console.log("SW registration failed:", err));
      });
    }
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAddToHome = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowInstall(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!showInstall) return null;
  return (
    <button
      className=" bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-yellow-400 text-black rounded-full shadow-lg z-50 font-bold text-lg"
      onClick={handleAddToHome}
    >
      ติดตั้งแอปบนหน้าจอ (Add to Home Screen)
    </button>
  );
}
