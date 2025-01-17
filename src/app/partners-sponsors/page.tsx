'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SponsorShowcase from '@/components/SponsorShowcase'
import PartnerCarousel from '@/components/PartnerCarousel'
import { sponsorsData, partnersData } from '@/data/partners-sponsors'
import { ChevronDown } from 'lucide-react'

export default function PartnersSponsorsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const categories = ['all', 'gold', 'silver', 'bronze', 'others']

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="relative h-[50vh] overflow-hidden">
     <div className="absolute inset-0 bg-black bg-opacity-60">
       <video
         autoPlay
         loop
         muted
         playsInline
         className="w-full h-full object-cover opacity-50"
       >
         <source src="https://res.cloudinary.com/dnbnev9lr/video/upload/v1737026869/19529709-hd_1920_1080_25fps_lwwppn.mp4" type="video/mp4" />
       </video>
     </div>
     <div className="absolute inset-0 flex items-center justify-center">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.8 }}
         className="text-center"
       >
        <h1 className="text-6xl font-bold text-white text-center">
            Our Sponsors & <span className="text-[#E67E22]">Partners</span>
          </h1>
         <p className="text-xl md:text-2xl text-white">
           The Pillars of NIDEFEST
         </p>
       </motion.div>
     </div>
   </header>

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Esteemed Sponsors</h2>
          <div className="relative mb-12">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full md:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold flex items-center justify-between md:inline-flex"
            >
              <span>{activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
              <ChevronDown className={`ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 w-full md:w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeCategory === category ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setActiveCategory(category)
                      setIsFilterOpen(false)
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SponsorShowcase 
                sponsors={
                  activeCategory === 'all'
                    ? {...sponsorsData}
                    : { [activeCategory]: sponsorsData[activeCategory as keyof typeof sponsorsData] }
                }
              />
            </motion.div>
          </AnimatePresence>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Valued Partners</h2>
          <PartnerCarousel partners={partnersData} />
        </section>
      </main>
    </div>
  )
}






// <header className="relative h-[40vh] overflow-hidden">
// <Image
//   src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800/v1734365481/pexels-efrem-efre-2786187-28284658_aulnph.jpg"
//   alt="Frequently Asked Questions"
//   layout="fill"
//   objectFit="cover"
//   className="brightness-50"
// />
// <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
// <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Partners & Sponsors</h1>
//   <p className="text-xl md:text-2xl text-gray-300">
//   Celebrating the incredible support behind NIDEFEST
// </p>
// </div>
// </header>

{/* <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute w-full h-full object-cover"
>
    <source src="https://res.cloudinary.com/dnbnev9lr/video/upload/v1737026869/19529709-hd_1920_1080_25fps_lwwppn.mp4" type="video/mp4" />
</video> */}