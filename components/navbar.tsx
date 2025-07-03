'use client'

import React, { useState, useEffect } from 'react';

const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-2xl  ${
      isScrolled 
        ? 'bg-[#710711]/80 backdrop-blur-lg shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            {
              isScrolled ? <div className=' flex flex-row items-center'>
              <img 
                src="/images/jk-icon.jpg" 
                alt="logo" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-bold text-white text-lg">จ่าคิง ปากพนัง</span>
            </div>
            : null
            }
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 bg-white/20 px-3 py-2 rounded-full">
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <img src="/images/facebook.png" alt="facebook" className="w-6 h-6" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
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