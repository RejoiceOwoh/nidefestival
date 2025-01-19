'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

interface Event {
  id: number;
  title: string;
  start: string; // or Date if you're using Date objects
  end: string; // or Date if you're using Date objects
  location: string;
  // Add any other properties relevant to your event
}

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void; // Define the type for the event handler
}

export default function EventList({ events, onSelectEvent }: EventListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectEvent(event)}
            className="bg-white bg-opacity-5 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-opacity-10"
          >
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-300 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(event.start).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              <span>{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

