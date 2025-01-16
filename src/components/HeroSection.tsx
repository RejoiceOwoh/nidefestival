'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Maximize } from 'lucide-react'
import Image from 'next/image'
import VideoDialog from './VideoDialog'
import ImageDialog from './ImageDialog'

const slides = [
  {
    type: 'video',
      src: 'https://res.cloudinary.com/dnbnev9lr/video/upload/v1737026869/19529709-hd_1920_1080_25fps_lwwppn.mp4',
      thumbnail: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1737027570/Screenshot_2025-01-16_at_12.39.21_tshw44.png',
      title: 'Experience the Rhythm',
      description: 'Immerse yourself in the vibrant traditional dances of the Niger Delta.',
      cta: { text: 'Explore Performances', href: '/performances' },
    duration: 5 // Duration in seconds
  },
  {
    type: 'video',
      src: 'https://res.cloudinary.com/dnbnev9lr/video/upload/v1737027632/3967249-hd_1366_720_24fps_l2trzl.mp4',
      thumbnail: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1737027680/Screenshot_2025-01-16_at_12.38.01_gzivqi.png',
      title: 'Experience the Rhythm',
      description: 'Immerse yourself in the vibrant traditional dances of the Niger Delta.',
      cta: { text: 'Explore Performances', href: '/performances' },
    duration: 7 // Duration in seconds
  },
  {
    type: 'video',
      src: 'https://res.cloudinary.com/dnbnev9lr/video/upload/v1737026854/112267444_1920_1080_25fps_lovuyc.mp4',
      thumbnail: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1737026859/pexels-safari-consoler-3290243-11834888_ujkzgx.jpg',
      title: 'Taste the Flavors',
      description: 'Savor the rich and diverse cuisine of the Niger Delta region.',
      cta: { text: 'Food Festival Info', href: '/food-festival' },
    duration: 7 // Duration in seconds
  },
  {
    type: 'video',
      src: 'https://res.cloudinary.com/dnbnev9lr/video/upload/v1737027641/12297192_1280_720_50fps_sfey3v.mp4',
      thumbnail: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1737027689/Screenshot_2025-01-16_at_12.38.08_z6eqwz.png',
      title: 'Taste the Flavors',
      description: 'Savor the rich and diverse cuisine of the Niger Delta region.',
      cta: { text: 'Food Festival Info', href: '/food-festival' },
    duration: 7 // Duration in seconds
  },
  // {
  //   type: 'image',
  //   src: 'https://images.pexels.com/photos/12241319/pexels-photo-12241319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //   thumbnail: 'https://images.pexels.com/photos/4176695/pexels-photo-4176695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //   title: 'Discover Local Artistry',
  //   description: 'Explore intricate crafts and artwork from talented local artisans.',
  //   cta: { text: 'Meet the Artisans', href: '/artisans' }
  // },
]


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const slideInterval = useRef<NodeJS.Timeout>()
  const videoRef = useRef<HTMLVideoElement>(null)

  const startSlideTimer = () => {
    stopSlideTimer()
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
  }

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
  }

  useEffect(() => {
    startSlideTimer()
    return () => stopSlideTimer()
  }, [])

  useEffect(() => {
    if (slides[currentSlide].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      const duration = slides[currentSlide].duration || 10
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    startSlideTimer()
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === 'video' ? (
            <video
              ref={videoRef}
              src={slides[currentSlide].src}
              className="absolute top-0 left-0 w-full h-full object-cover"
              muted
              playsInline
            />
          ) : (
            <Image
              src={slides[currentSlide].src || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div 
            className="text-white md:max-w-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
            <p className="text-lg md:text-xl mb-6">{slides[currentSlide].description}</p>
            <motion.a
              href={slides[currentSlide].cta.href}
              className="inline-block bg-gradient-to-r from-[#E67E22] to-[#D35400] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{slides[currentSlide].cta.text}</span>
              <motion.span
                className="absolute inset-0 rounded-full bg-white"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-16 sm:right-16">
        {slides[currentSlide].type === 'video' ? (
          <motion.button
            onClick={() => setIsVideoDialogOpen(true)}
            className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="w-6 h-6 text-white" />
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setIsImageDialogOpen(true)}
            className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Maximize className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-16 h-10 rounded-md overflow-hidden ${
              index === currentSlide ? 'ring-2 ring-white' : 'opacity-70'
            }`}
            whileHover={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={slide.thumbnail || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
            {index === currentSlide && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <VideoDialog
        isOpen={isVideoDialogOpen}
        onClose={() => setIsVideoDialogOpen(false)}
        videoSrc={slides[currentSlide].type === 'video' ? slides[currentSlide].src : ''}
      />

      <ImageDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        imageSrc={slides[currentSlide].type === 'image' ? slides[currentSlide].src : ''}
        imageAlt={slides[currentSlide].title}
      />
    </section>
  )
}

