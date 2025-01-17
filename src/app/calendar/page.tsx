import Image from 'next/image'
import Calendar from '@/components/Calendar'
import UpcomingEvents from '@/components/UpcomingEvents'

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365487/2149029454_ubzp5t.jpg"
          alt="Niger Delta Festival Calendar"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Niger Delta Festival Calendar</h1>
          <p className="text-xl max-w-2xl">Explore the exciting events and activities planned for the Niger Delta Festival of Arts and Culture</p>
        </div>
      </section>

      <section className="py-16">
        <Calendar />
      </section>

      <section className="py-16 bg-white">
        <UpcomingEvents />
      </section>
    </div>
  )
}

