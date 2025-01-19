'use client'

import { motion } from 'framer-motion'
import { Search, Plus } from 'lucide-react'

const categories = ['All', 'Music', 'Dance', 'Art', 'Food', 'Workshop']

interface CalendarHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setIsAddEventFormOpen: (isOpen: boolean) => void;
}

export default function CalendarHeader({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  setIsAddEventFormOpen
}: CalendarHeaderProps) {
  return (
    <motion.header 
      className="bg-[#2C3E50] text-white py-8"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Niger Delta Festival Calendar</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-[#E67E22] text-white' 
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddEventFormOpen(true)}
            className="bg-[#E67E22] hover:bg-[#D35400] text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Event</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

