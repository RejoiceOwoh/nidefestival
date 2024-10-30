"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutMain from "../about/_components/aboutmain";
import AboutUs from "./AboutUs";

const AboutPage = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218624/_LUP8399_qhesh0.png"
          alt="Acefoods Banner"
          fill
          style={{ objectFit: 'cover' }}
          objectPosition="bottom"
          priority
        />
        <div className="absolute inset-0 bg-black/50  flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-accent text-center tracking-tight"
          >
            About Us
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-2xl p-8 md:p-12"
        >
          <AboutUs />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
