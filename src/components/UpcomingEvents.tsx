import { CalendarDays, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'

const upcomingEvents = [
  { id: 1, title: 'Pre-registration Opens', date: 'April 1, 2025', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1500,h_1000,g_auto/v1734365461/Traditional-Dance-Day-39-scaled_ipc1v4.jpg' },
  { id: 2, title: 'Artist Submission Deadline', date: 'June 15, 2025', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1500,h_1000,g_auto/v1734365460/pexels-kureng-workx-2546437-4152126_s2onok.jpg' },
  { id: 3, title: 'Festival Kickoff', date: 'August 1, 2025', image: 'https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1500,h_1000,g_auto/v1734365468/pexels-christian-alemu-127251395-28664276_i9nhkt.jpg' },
]

const UpcomingEvents = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="flex items-center text-gray-600">
                <CalendarDays className="w-5 h-5 mr-2" />
                <span>{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingEvents

