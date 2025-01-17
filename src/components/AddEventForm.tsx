'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function AddEventForm({ onClose, onAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    location: '',
    category: 'Music'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddEvent(newEvent)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <textarea
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            value={newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Event Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <select
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="Music">Music</option>
            <option value="Dance">Dance</option>
            <option value="Art">Art</option>
            <option value="Food">Food</option>
            <option value="Workshop">Workshop</option>
          </select>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#E67E22] text-white rounded hover:bg-[#D35400]"
            >
              Add Event
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

