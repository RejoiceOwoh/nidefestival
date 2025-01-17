'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, ChevronRight, Play, Pause } from 'lucide-react'

// Sample event data (replace with actual data in production)
const events = [
  { id: 1, name: "Opening Ceremony", date: "2023-08-01", time: "10:00 AM", location: "Port Harcourt Stadium" },
  { id: 2, name: "Traditional Dance Competition", date: "2023-08-02", time: "2:00 PM", location: "Cultural Center, Yenagoa" },
  { id: 3, name: "Art Exhibition", date: "2023-08-03", time: "11:00 AM", location: "National Museum, Benin City" },
  { id: 4, name: "Music Festival", date: "2023-08-04", time: "7:00 PM", location: "Calabar Stadium" },
  { id: 5, name: "Culinary Showcase", date: "2023-08-05", time: "12:00 PM", location: "Eko Hotel, Lagos" },
]

const EventCard = ({ event }: { event: typeof events[0] }) => (
  <motion.div
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
    <div className="flex items-center text-sm mb-1">
      <Calendar className="w-4 h-4 mr-2" />
      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
    </div>
    <div className="flex items-center text-sm mb-1">
      <Clock className="w-4 h-4 mr-2" />
      <span>{event.time}</span>
    </div>
    <div className="flex items-center text-sm">
      <MapPin className="w-4 h-4 mr-2" />
      <span>{event.location}</span>
    </div>
  </motion.div>
)

export default function CalendarOverview() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    let animationFrame: number

    const updateProgress = (startTime: number) => {
      const elapsedTime = Date.now() - startTime
      setProgress((elapsedTime / 5000) * 100)

      if (elapsedTime < 5000) {
        animationFrame = requestAnimationFrame(() => updateProgress(startTime))
      }
    }

    if (isPlaying) {
      const startTime = Date.now()
      updateProgress(startTime)

      interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
        setProgress(0)
        updateProgress(Date.now())
      }, 5000)
    }

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animationFrame)
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#2C3E50] to-[#4faf4c] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Festival Calendar</h2>
        <div className="max-w-2xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <EventCard key={events[currentEventIndex].id} event={events[currentEventIndex]} />
          </AnimatePresence>
          <div className="mt-4 flex items-center justify-between">
            <div className="w-full bg-white bg-opacity-20 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#E67E22]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              onClick={togglePlayPause}
              className="ml-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/full-calendar"
            className="inline-flex items-center bg-[#E67E22] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D35400] transition-all duration-300 transform hover:scale-105"
          >
            View Full Calendar
            <ChevronRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
