"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactForm from "./_components/contact-form";
import ContactInformation from "./_components/contact-info";
import FindUs from "./_components/find-us";

const ContactPage = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218410/_LUP8406_gguzww.png"
          alt="About Us Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/50  flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white text-center tracking-tight"
          >
            Contact Us
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
          <p className="text-xl text-gray-600 text-center mb-12 leading-relaxed">
            We can{"'"}t wait to hear from you. Kindly send us a message below
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <ContactInformation />
              <FindUs />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
