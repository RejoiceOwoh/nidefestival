'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Header from '@/components/CalendarHeader'
import EventList from '@/components/EventList'
import EventModal from '@/components/EventModal'
import AddEventForm from '@/components/AddEventForm'
import { events as initialEvents } from '@/data/event'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

export default function CalendarPage() {
  const [events, setEvents] = useState(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddEventFormOpen, setIsAddEventFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || event.category === selectedCategory)
  )

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }])
    setIsAddEventFormOpen(false)
  }

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    setIsModalOpen(false)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId))
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C3E50] to-[#4CA1AF] text-white">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setIsAddEventFormOpen={setIsAddEventFormOpen}
      />
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BigCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg"
            />
          </div>
          <div>
            <EventList 
              events={filteredEvents} 
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </motion.div>
      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      {isAddEventFormOpen && (
        <AddEventForm
          onClose={() => setIsAddEventFormOpen(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  )
}

