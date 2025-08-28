import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = ({ 
  slides = [], 
  height = "50vh",
  overlayOpacity = 0.4,
  textPosition = "left", // 'left', 'center', or 'right'
  buttonText,
  buttonIcon,
  onButtonClick
}) => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden" style={{ height }}>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.hero-next-button',
          prevEl: '.hero-prev-button',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={`w-full h-full`}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {overlayOpacity > 0 && (
              <div 
                className="absolute inset-0 z-10" 
                style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
              ></div>
            )}
            <img 
              src={slide.image} 
              alt={slide.title || ''}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {(slide.title || slide.subtitle || (buttonText && onButtonClick)) && (
              <div className={`absolute inset-0 flex items-center z-20 px-4 md:px-16 ${textPosition === 'center' ? 'text-center justify-center' : textPosition === 'right' ? 'text-right justify-end' : ''}`}>
                <div className="max-w-2xl">
                  {slide.title && (
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl md:text-6xl font-bold mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                  )}
                  
                  {slide.subtitle && (
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-xl md:text-2xl mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  
                  {buttonText && onButtonClick && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold flex items-center gap-2"
                      onClick={onButtonClick}
                    >
                      {buttonText} {buttonIcon}
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Navigation Buttons - Only show if there are multiple slides */}
        {slides.length > 1 && (
          <>
            <button className="hero-prev-button absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all">
              <FiChevronLeft className="text-2xl" />
            </button>
            <button className="hero-next-button absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all">
              <FiChevronRight className="text-2xl" />
            </button>
          </>
        )}
      </Swiper>
    </section>
  );
};

export default HeroSlider;