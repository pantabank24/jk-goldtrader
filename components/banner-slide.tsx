import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const BannerSlider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample banner data - คุณสามารถเปลี่ยนเป็นรูปภาพของคุณได้
  const banners = [
    {
      id: 1,
      title: "",
      subtitle: "",
      image: "/images/jk-banner.jpg",
      gradient: ""
    },
    {
      id: 2,
      title: "รับซื้อทองคำ",
      subtitle: "ให้ราคาสูงที่สุด จ่ายสดหน้าร้าน",
      image: "/images/banner2.jpg",
      gradient: "bg-black/30"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index:any) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

    return (
    <div className="relative w-full h-60 sm:h-80 lg:h-96 overflow-hidden bg-black">
        <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg transition-all duration-300"
              style={{ backgroundImage: `url(${banners[currentSlide].image})` }}
            />
        <div className="relative w-full h-full max-w-screen-xl mx-auto">
      {/* Banner Container */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            />

            {/* <Image width={1300} height={500} src="/images/jk-banner.jpg" alt="banner"/> */}
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 ${banner.gradient}`} />
            
            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <div className="text-center max-w-4xl px-6">
                <h1 className="text-5xl md:text-7xl font-bold  tracking-tight">
                  <span className="block opacity-0 animate-[slideUp_0.8s_ease-out_0.3s_forwards] bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent">
                    {banner.title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-90 opacity-0 animate-[slideUp_0.8s_ease-out_0.6s_forwards]">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent" />

      

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      </div>
    </div>
  );
}