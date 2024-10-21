"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

// Text slideshow content
const heroText = [
    {
        title: "Pure, Premium, Natural!",
        subtitle: "From Nigeria’s Heart to Your Kitchen, with Care and Excellence",
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % heroText.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Fullscreen Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover object-right"
                autoPlay
                loop
                muted
                playsInline
                src="https://res.cloudinary.com/dyd0lsoo4/video/upload/v1725752603/VID-20240906-WA0011_f9k0aj.mp4" // Replace with your video path or URL
            >
                Your browser does not support the video tag.
            </video>
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Image
                            src="/afrigoldlogowhite.png" // Replace with your logo path
                            alt="Logo"
                            width={100}
                            height={100}
                            className="w-25 h-25 md:w-40 md:h-40 object-contain"
                        />
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
                                {heroText[currentSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8">
                                {heroText[currentSlide].subtitle}
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    href="/products"
                                    className="bg-transparent text-white px-4 md:px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary hover:text-accent border-2 border-primary transition duration-300 flex items-center"
                                >
                                    Explore Products
                                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                                </Link>
                                <Link
                                    href="/products"
                                    className="bg-primary text-accent px-4 md:px-8 py-3 rounded-full text-lg font-semibold hover:bg-transparent hover:text-accent border-2 border-primary transition duration-300"
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroText.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-primary" : "bg-accent bg-opacity-50"
                            } transition-all duration-300`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
