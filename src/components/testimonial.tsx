"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Pause, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Kenechukwu Igboanu",
    image: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727197854/IMG-20240924-WA0005_y2ivgm.jpg",
    content: "I had given up on buying adulterated and watered down palm oil since I arrived UK. But AfriGold has restored my peace and finally I can experience the feel of home. Best palm oil brand in the UK bar none."
  },
  {
    name: "Ifeanyi Aneke",
    image: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727197847/IMG-20240924-WA0004_gcz6dd.jpg",
    content: "Delivery was perfect, product was received ontime and am glad with my oder as I got what I expected. The oil was just perfect and fresh. Much recommended 👌. Thanks to afrigold oil."
  },
  {
    name: "Stephanie Chinenye",
    image: "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727197848/IMG-20240924-WA0009_djt81h.jpg",
    content: "I just made soup with this palm oil based on recommendation by friend and this is real undiluted native oil. With better original palm oil taste. No sour gummy taste nor any mixture. Frankly the best palm oil I have used since I came to this UK"
  }
]

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isPlaying) {
      intervalId = setInterval(nextTestimonial, 5000)
    }
    return () => clearInterval(intervalId)
  }, [isPlaying, nextTestimonial])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Customer Stories
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear what our customers have to say about AfriGold Palm Oil
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Card className="w-full max-w-4xl overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative w-28 h-28 mb-6">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-1 text-primary mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl italic text-gray-700 mb-6">
                    {'"'}{testimonials[currentIndex].content}{'"'}
                  </blockquote>
                  <p className="text-lg font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4">
          <Button variant="outline" size="icon" onClick={prevTestimonial} aria-label="Previous testimonial">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={nextTestimonial} aria-label="Next testimonial">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`mx-1 h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}