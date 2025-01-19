'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { governors } from '@/data/governors'
import RichTextContent from '@/components/RichTextContent'

export default function GovernorPage() {
  const { id } = useParams()
  const governor = governors.find(g => g.id === Number(id))

  if (!governor) {
    return <div>Governor not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <Image
            src={governor.image || "/placeholder.svg"}
            alt={governor.name}
            layout="fill"
            objectFit="cover"
            className="brightness-50 object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center p-8 rounded-lg shadow-lg"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{governor.name}</h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Governor of {governor.state} State
            </p>
          </motion.div>
        </div>
      </header>

          
        
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <Image
                src={governor.image || "/placeholder.svg"}
                alt={governor.name}
                width={400}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <RichTextContent content={governor.content} />
          </div>
        </div>
      </main>
    </div>
  )
}

