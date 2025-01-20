"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Music,
  Utensils,
  Palette,
  Users,
  Ticket,
  Camera,
  VenetianMaskIcon as Mask,
  Book,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { festivalData } from "@/data/event"

const iconMap = {
  Music,
  Utensils,
  Palette,
  Users,
  Ticket,
  Camera,
  VenetianMask: Mask,
  Book,
}

interface FeatureCardProps {
  icon: keyof typeof iconMap
  title: string
  description: string
  color: string
  index: number
}

const FeatureCard = ({ icon, title, description, color, index }: FeatureCardProps) => {
  const IconComponent = iconMap[icon] || Users // Default to Users icon if not found

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg p-6 shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: color || "#000000" }}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 ml-4">{title || "Untitled Feature"}</h3>
      </div>
      <p className="text-gray-600">{description || "No description available"}</p>
    </motion.div>
  )
}

export default function FestivalOverview() {
  const [currentPage, setCurrentPage] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  if (!festivalData || !Array.isArray(festivalData.features) || festivalData.features.length === 0) {
    console.error("Festival data is missing or invalid")
    return null
  }

  const featuresPerPage = 4
  const totalPages = Math.ceil(festivalData.features.length / featuresPerPage)

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#F5E6D3] to-white">
        <motion.div className="absolute inset-0" style={{ y, opacity }}>
          <Image
            src={festivalData.backgroundImage || "/placeholder.svg"}
            alt="Festival Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </motion.div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">{festivalData.title}</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">{festivalData.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <AnimatePresence mode="wait">
            {festivalData.features
              .slice(currentPage * featuresPerPage, (currentPage + 1) * featuresPerPage)
              .map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon as keyof typeof iconMap}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-16">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/tickets"
            className="inline-flex items-center px-8 py-4 bg-[#E67E22] text-white text-lg font-semibold rounded-full hover:bg-[#D35400] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Ticket className="w-6 h-6 mr-2" />
            {festivalData.ticketInfo.cta}
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-gray-600"
          >
            {festivalData.ticketInfo.urgency}
          </motion.p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}

