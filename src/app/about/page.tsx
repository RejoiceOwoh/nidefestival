'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { aboutNidefest, aboutPJChills } from '@/data/content'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_crop,w_800,h_1600,g_auto/v1734365479/pexels-rdne-6192557_xxjwiz.jpg"
          alt="About Us Banner"
          fill
          className="brightness-50 object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white text-center">
            About <span className="text-[#E67E22]">Us</span>
          </h1>
        </motion.div>
      </header>

      {/* About NIDEFEST */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2">
              <Image
                src={aboutNidefest.imageSrc || "/placeholder.svg"}
                alt={aboutNidefest.imageAlt}
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">{aboutNidefest.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{aboutNidefest.subtitle}</p>
              <p className="text-gray-700 mb-6">{aboutNidefest.excerpt}</p>
              <Link 
                href="/about/nidefest" 
                className="inline-flex items-center px-6 py-3 bg-[#E67E22] text-white rounded-full hover:bg-[#D35400] transition-colors"
              >
                Read More <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About PJ Chills and Crew */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row-reverse items-center gap-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2">
              <Image
                src={aboutPJChills.imageSrc || "/placeholder.svg"}
                alt={aboutPJChills.imageAlt}
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">{aboutPJChills.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{aboutPJChills.subtitle}</p>
              <p className="text-gray-700 mb-6">{aboutPJChills.excerpt}</p>
              <Link 
                href="/about/pj-chills-and-crew" 
                className="inline-flex items-center px-6 py-3 bg-[#E67E22] text-white rounded-full hover:bg-[#D35400] transition-colors"
              >
                Read More <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
