"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, ChevronRight, Play, Pause } from "lucide-react"
import { events } from "@/data/event"

interface Event {
  id: number
  title: string
  start: Date
  end: Date
  description: string
  location: string
  category: string
}

const EventCard = ({ event }: { event: Event }) => (
  <motion.div
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
    <div className="flex items-center text-sm mb-1">
      <Calendar className="w-4 h-4 mr-2" />
      <span>{event.start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
    </div>
    <div className="flex items-center text-sm mb-1">
      <Clock className="w-4 h-4 mr-2" />
      <span>{event.start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
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
              <motion.div className="h-full bg-[#E67E22]" style={{ width: `${progress}%` }} />
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

