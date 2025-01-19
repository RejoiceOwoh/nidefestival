"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { aboutNidefest, aboutPJChills } from "@/data/content"

const FactItem = ({ fact }: { fact: string }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center space-x-2 text-gray-700"
  >
    <ChevronRight className="w-4 h-4 text-[#E67E22]" />
    <span>{fact}</span>
  </motion.li>
)

export default function AboutUsSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-24 bg-gradient-to-br from-[#F5E6D3] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 text-gray-800"
        >
          Discover NIDEFEST
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-gray-800">{aboutNidefest.title}</h3>
            <p className="text-xl text-gray-600 leading-relaxed">{aboutNidefest.excerpt}</p>
            <ul className="space-y-2 mt-6">
              {aboutNidefest.quickFacts.map((fact, index) => (
                <FactItem key={index} fact={fact} />
              ))}
            </ul>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about-nidefest"
                className="inline-block mt-6 px-8 py-3 bg-[#E67E22] text-white font-semibold rounded-full hover:bg-[#D35400] transition-colors duration-300 shadow-lg"
              >
                Learn More About NIDEFEST
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={aboutNidefest.imageSrc || "/placeholder.svg"}
              alt={aboutNidefest.imageAlt}
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded"
            >
              <p className="text-sm">{aboutNidefest.imageAlt}</p>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Brought to you by</h4>
          <p className="text-xl text-gray-600 mb-6">{aboutPJChills.title}</p>
          <Link
            href="/about-pj-chills"
            className="text-[#E67E22] hover:text-[#D35400] font-semibold transition-colors duration-300"
          >
            Learn about the team behind NIDEFEST
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

