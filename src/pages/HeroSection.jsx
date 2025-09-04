


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [activeImage, setActiveImage] = useState(0);

  const backgrounds = [
    {
      image: "/Bgimg1.jpg",
      content: (
        <>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Excellence in
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </span>
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Nurturing young minds from PG to Class 12 across CBSE, ICSE & UP Board.
            Join thousands of successful students who achieved their dreams with RL Classes.
          </p>
        </>
      ),
      align: "left",
    },
    {
      image: "/Bgimg2.jpg",
      content: (
        <>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            At
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RL Classes
            </span>
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            We emphasize personalized attention and modern teaching methods.
            <br />
            Our experienced faculty ensures every student gets the guidance <br />
            they need to excel in their academic journey.
            <br />
            Join us and become a part of an institution that truly values your success.
          </p>
        </>
      ),
      align: "right",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handlePrev = () => {
    setActiveImage((prev) =>
      prev === 0 ? backgrounds.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <section className="relative h-[75vh] overflow-hidden">
      {/* Background Images with Fade Transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={backgrounds[activeImage].image}
            src={backgrounds[activeImage].image}
            alt="Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-[75vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`relative z-10 text-white ${
                backgrounds[activeImage].align === "right"
                  ? "col-span-2 flex justify-end text-right"
                  : ""
              }`}
            >
              <div>
                {backgrounds[activeImage].content}

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 mt-4 ${
                    backgrounds[activeImage].align === "right"
                      ? "justify-end"
                      : ""
                  }`}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 group"
                    >
                      Explore Courses
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;
