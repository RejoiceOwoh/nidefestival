'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

// Sample event data (replace with data from your API/backend)
const events = [
  { id: 1, date: '2025-05-01', title: 'Opening Ceremony', time: '10:00 AM', location: 'Main Stage', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200,g_auto/v1734365478/2148825072_sgrdth.jpg' },
  { id: 2, date: '2025-05-01', title: 'Cultural Dance Competition', time: '2:00 PM', location: 'Performance Hall', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200,g_auto/v1734365475/pexels-jenyzest-4166353_qpk28n.jpg' },
  { id: 3, date: '2025-05-02', title: 'Closing Gala', time: '7:00 PM', location: 'Grand Ballroom', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200/v1734365474/pexels-dejiprince-27914768_r3klwp.jpg' },
  { id: 4, date: '2025-05-02', title: 'Closing Gala', time: '7:00 PM', location: 'Grand Ballroom', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200,g_auto/v1734365472/pexels-dokun-ayano-2197443-27433122_ovlbvu.jpg' },
  { id: 5, date: '2025-05-03', title: 'Closing Gala', time: '7:00 PM', location: 'Grand Ballroom', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200,g_auto/v1734365472/pexels-thisfolu-28751377_cg8upg.jpg' },
  { id: 6, date: '2025-05-03', title: 'Closing Gala', time: '7:00 PM', location: 'Grand Ballroom', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_300,h_200,g_auto/v1734365468/pexels-christian-alemu-127251395-28664276_i9nhkt.jpg' },
  // Add more events as needed
]

const months = ['April', 'May', 'June', 'July', 'August', 'September', 'October']

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(4) // August is index 4
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const daysInMonth = new Date(2025, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(2025, currentMonth, 1).getDay()

  const handlePrevMonth = () => setCurrentMonth((prev) => (prev > 0 ? prev - 1 : prev))
  const handleNextMonth = () => setCurrentMonth((prev) => (prev < months.length - 1 ? prev + 1 : prev))

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date)
  }

  const renderCalendarDays = () => {
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2025-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const hasEvents = events.some(event => event.date === date)
      days.push(
        <motion.button
          key={day}
          className={`h-14 rounded-full flex items-center justify-center relative ${
            hasEvents ? 'font-bold' : ''
          } ${selectedDate === date ? 'bg-[#E67E22] text-white' : 'hover:bg-gray-100'}`}
          onClick={() => handleDateClick(date)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
          {hasEvents && (
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#E67E22] rounded-full"></span>
          )}
        </motion.button>
      )
    }
    return days
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handlePrevMonth} className="text-gray-600 hover:text-[#E67E22]" disabled={currentMonth === 0}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">{months[currentMonth]} 2025</h2>
          <button onClick={handleNextMonth} className="text-gray-600 hover:text-[#E67E22]" disabled={currentMonth === months.length - 1}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">Events on {selectedDate}</h3>
            {events.filter(event => event.date === selectedDate).map(event => (
              <div key={event.id} className="mb-6 last:mb-0">
                <div className="flex items-start">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={150}
                    height={100}
                    className="rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{event.title}</h4>
                    <div className="flex items-center text-gray-600 mt-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Calendar

