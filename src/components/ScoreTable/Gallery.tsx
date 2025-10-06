import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/public/futsal.jpg",
  "/public/futsal02.jpg",
  "/public/futsal03.jpg",
  "/public/gallery4.jpg",
  "/public/gallery5.jpg",
  "/public/gallery6.jpg",
];

const Gallery: React.FC = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-indigo-50 flex flex-col justify-center items-center pt-10 pb-10 px-6 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-800 mb-8">
        📸 Inter NIT Tournament Gallery
      </h1>

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
        <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            alt={`Gallery ${index}`}
            className="w-full h-64 sm:h-80 md:h-[450px] object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-indigo-700 p-2 rounded-full shadow-md"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-indigo-700 p-2 rounded-full shadow-md"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Thumbnail dots */}
      <div className="flex mt-6 gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-indigo-600 scale-125" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>

      <footer className="text-center text-gray-500 mt-10 text-sm">
        Captured Moments |{" "}
        <span className="font-semibold text-orange-600">NIT Jamshedpur</span>
      </footer>
    </div>
  );
};

export default Gallery;
