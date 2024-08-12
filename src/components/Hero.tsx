"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const heroImages = [
    {
        src: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218461/_LUP8383_t0pxo2.png",
        alt: "Right from the Palms",
        title: "Afrigold Palm Oil",
        subtitle: "Sourced from Nigeria, crafted for you.",
    },
    {
        src: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218624/_LUP8399_qhesh0.png",
        alt: "Nigerian Tradition",
        title: "Rich in Flavor",
        subtitle: "Experience the essence of Nigeria in every drop."
    },
    {
        src: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218467/_LUP8401_nhtjxj.png",
        alt: "Sustainability at Heart",
        title: "Pure & Authentic",
        subtitle: "Sustainable farming, premium quality."
    },
    {
        src: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218464/_LUP8369_qrvcnq.png",
        alt: "Culinary Excellence",
        title: "Versatile & Nutritious",
        subtitle: "Perfect for all your culinary creations."
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background Images */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={heroImages[currentSlide].src}
                        alt={heroImages[currentSlide].alt}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black opacity-50" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                            {heroImages[currentSlide].title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            {heroImages[currentSlide].subtitle}
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="/products"
                                className="bg-transparent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#faba38] hover:text-black border-2 border-[#faba38] transition duration-300 flex items-center"
                            >
                                Explore Products
                                <ChevronRightIcon className="w-5 h-5 ml-2" />
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-[#faba38] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-white border-2 border-[#faba38] transition duration-300"
                            >
                                Buy Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Animated Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#faba38]" : "bg-white bg-opacity-50"
                            } transition-all duration-300`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;