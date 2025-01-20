'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { governors } from '@/data/governors'

export default function GovernorsGalleryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeState, setActiveState] = useState('all')

  const states = ['all', ...new Set(governors.map(governor => governor.state))]

  const filteredGovernors = activeState === 'all'
    ? governors
    : governors.filter(governor => governor.state === activeState)

  return (
    <div className="min-h-screen bg-white">
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365449/pexels-ogonna-sylvester-ogbu-1047836026-20410318_xyswxi.jpg"
            alt="Governors of Niger Delta"
            objectFit="cover"
            fill
            className="brightness-50 object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h1 className="text-6xl font-bold text-white text-center">
              Governors <span className="text-[#E67E22]">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Meet the Leaders of the Niger Delta States
            </p>
          </motion.div>
        </div>
      </header>


      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full md:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold flex items-center justify-between md:inline-flex"
            >
              <span>{activeState.charAt(0).toUpperCase() + activeState.slice(1)}</span>
              <ChevronDown className={`ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 w-full md:w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {states.map((state) => (
                  <button
                    key={state}
                    className={`block w-full text-left px-4 py-2 text-sm ${activeState === state ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => {
                      setActiveState(state)
                      setIsFilterOpen(false)
                    }}
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGovernors.map((governor) => (
            <Link href={`/gallery/governors/${governor.id}`} key={governor.id}>
              <motion.div
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-80">
                  <Image
                    src={governor.image || "/placeholder.svg"}
                    alt={governor.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{governor.name}</h2>
                  <p className="text-gray-600">Governor of {governor.state} State</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

