'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { governors } from '@/data/governors'

const CountdownTimer = ({ duration, isPlaying }: { duration: number; isPlaying: boolean }) => {
  return (
    <div className="w-full bg-gray-200 h-1 mt-4">
      <motion.div
        className="bg-[#E67E22] h-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        key={isPlaying ? "playing" : "paused"}
      />
    </div>
  )
}

export default function GovernorsSection() {
  const [activeGovernor, setActiveGovernor] = useState(governors[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveGovernor((prev) => {
          const nextIndex = (governors.findIndex((g) => g.id === prev.id) + 1) % governors.length
          return governors[nextIndex]
        })
      }, 10000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Governors of the Niger Delta States</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="lg:w-1/3 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {governors.map((governor) => (
              <motion.div
                key={governor.id}
                className={`cursor-pointer overflow-hidden rounded-lg ${
                  activeGovernor.id === governor.id ? 'ring-2 ring-[#E67E22]' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGovernor(governor)}
              >
                <Image
                  src={governor.image || "/placeholder.svg"}
                  alt={governor.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="lg:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGovernor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row h-full"
              >
                <div className="md:w-1/2 h-[400px] md:h-full relative">
                  <Image
                    src={activeGovernor.image || "/placeholder.svg"}
                    alt={activeGovernor.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{activeGovernor.name}</h3>
                    <h4 className="text-xl text-gray-600 mb-4">Governor of {activeGovernor.state} State</h4>
                    <p className="text-gray-700 mb-6">{activeGovernor.description}</p>
                  </div>
                  <div>
                    <Link
                      href={`/governors/${activeGovernor.id}`}
                      className="inline-block bg-[#E67E22] text-white px-6 py-2 rounded-full hover:bg-[#D35400] transition-colors"
                    >
                      Read More
                    </Link>
                    <div className="mt-8 flex justify-between items-center">
                      <CountdownTimer duration={10000} isPlaying={isPlaying} />
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-gray-600 hover:text-[#E67E22] transition-colors"
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

