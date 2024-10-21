'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, EyeIcon, ChevronDown, ChevronUp } from 'lucide-react'

const coreValues = [
  { title: "Quality Assurance", description: "Committed to delivering pure, premium-grade palm oil with consistent quality in every product." },
  { title: "Natural Production", description: "Focused on producing palm oil that is natural, free from additives, and sourced from trusted local farms." },
  { title: "Health Conscious", description: "Prioritizing the health and well-being of customers by providing nutrient-rich, heart-friendly palm oil." },
  { title: "Tradition and Heritage", description: "Honoring the rich agricultural traditions of Nigeria, while maintaining modern production standards." },
  { title: "Environmental Responsibility", description: "Committed to eco-friendly production methods that respect the environment and ensure long-term sustainability." },
]

const images = [
  "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727034876/afrigoldmodel_fi11yt.png",
  "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218461/_LUP8383_t0pxo2.png",
  "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218459/GOLD1_iucli8.png",
   "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218410/_LUP8365_k4l1z5.png", 
]

export default function AboutUs() {
  const [currentImage, setCurrentImage] = useState(0)
  const [expandedValue, setExpandedValue] = useState<number | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <svg
              aria-hidden="true"
              className="absolute left-[50%] top-0 h-[48rem] w-[96rem] -translate-x-1/2 opacity-30"
            >
              <defs>
                <pattern id="grid-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
                  <path d="M32 0v64M0 32h64" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          
          <motion.div
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
            className="grid gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div className="space-y-12">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-accent-foreground sm:text-5xl">Our Story</h1>
                <p className="mt-4 text-lg leading-7 text-gray-600">
                  Afrigold Palm Oil is a UK-based brand with deep Nigerian roots. We believe in delivering pure, nutrient-rich palm oil that embodies the richness of Nigeria{"'"}s agricultural heritage. Our journey started with a simple idea: bringing premium, natural palm oil to homes and kitchens worldwide, ensuring every drop contributes to a healthier and tastier cooking experience.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-accent-foreground">Our Vision</h2>
                <p className="mt-4 text-lg leading-7 text-gray-600">
                  To become the leading global brand for premium, ethically-sourced palm oil, known for quality and sustainability.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-accent-foreground">Our Mission</h2>
                <p className="mt-4 text-lg leading-7 text-gray-600">
                  To offer high-quality, ethically-sourced palm oil that enriches lives and promotes sustainable agricultural practices.
                </p>
              </div>
            </div>
            
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              <Image
                src={images[currentImage]}
                alt={`Afrigold Palm Oil ${currentImage + 1}`}
                fill
                className="object-cover rounded-2xl shadow-2xl transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent-foreground/10"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
            className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-accent-foreground">Why Choose Us?</h2>
              <p className="mt-4 text-lg leading-7 text-gray-600">
                Afri Gold Palm Oil ensures the finest quality through rigorous sourcing and production standards. From local Nigerian farms to our eco-friendly packaging, we take pride in the purity, flavor, and health benefits our palm oil provides.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-accent-foreground mb-6">Our Core Values</h2>
              <ul className="space-y-4">
                {coreValues.map((value, index) => (
                  <li key={index} className="bg-gray-50 rounded-lg shadow-sm">
                    <button
                      className="w-full text-left px-4 py-3 flex items-center justify-between"
                      onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <span className="text-lg font-medium text-white">{index + 1}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-accent-foreground">{value.title}</h3>
                      </div>
                      {expandedValue === index ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </button>
                    {expandedValue === index && (
                      <div className="px-4 pb-3">
                        <p className="text-base text-gray-600">{value.description}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}