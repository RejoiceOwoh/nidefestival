'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, ChevronLeft, ChevronRight, Play, Pause, Share2 } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { statesGalleryData } from '@/data/states-gallery'
import ShareButtons from '@/components/GalleryShareButtons'

export default function StatesGalleryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeState, setActiveState] = useState('all')
  const [activeMediaType, setActiveMediaType] = useState('all')
  const [selectedMedia, setSelectedMedia] = useState<null | { type: string; url: string; caption: string }>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const states = ['all', ...new Set(statesGalleryData.map(item => item.state))]
  const mediaTypes = ['all', 'image', 'video']

  const filteredMedia = statesGalleryData.filter(item => 
    (activeState === 'all' || item.state === activeState) &&
    (activeMediaType === 'all' || item.type === activeMediaType)
  )

  const handleMediaClick = (media: { type: string; url: string; caption: string }, index: number) => {
    setSelectedMedia(media)
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const handlePrevNext = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredMedia.length) % filteredMedia.length
      : (currentIndex + 1) % filteredMedia.length
    setSelectedMedia(filteredMedia[newIndex])
    setCurrentIndex(newIndex)
  }, [currentIndex, filteredMedia])

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        handlePrevNext('next')
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, handlePrevNext])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, selectedMedia])

  return (
    <div className="min-h-screen bg-white">
      <header className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365449/pexels-ogonna-sylvester-ogbu-1047836026-20410318_xyswxi.jpg"
            alt="Governors of Niger Delta"
            fill
            sizes="100vw"
            className="brightness-50 object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h1 className="text-6xl font-bold text-white text-center">
              States <span className="text-[#E67E22]">Gallery</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Explore the beauty of the Niger Delta States
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full text-lg font-semibold flex items-center"
            >
              <span>{activeState.charAt(0).toUpperCase() + activeState.slice(1)}</span>
              <ChevronDown className={`ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                {states.map((state) => (
                  <button
                    key={state}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeState === state ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setActiveState(state)
                      setIsFilterOpen(false)
                    }}
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {mediaTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  activeMediaType === type 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setActiveMediaType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMediaClick(item, index)}
            >
              <div className="aspect-square relative">
                {item.type === 'image' ? (
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.caption}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-7xl w-full bg-black bg-opacity-75 p-0 overflow-hidden border-0">
          <DialogTitle className="sr-only">Media Viewer</DialogTitle>
          <div className="relative flex items-center justify-center h-[80vh]">
            <button
              className="absolute top-2 right-2 p-1 bg-white rounded-full z-10"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full">
              {selectedMedia?.type === 'image' ? (
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.caption}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={selectedMedia?.url}
                  className="w-full h-full object-contain"
                  controls
                  controlsList="nodownload"
                  playsInline
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white text-sm mb-4">{selectedMedia?.caption}</p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors"
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
            <button
              className="absolute top-1/2 left-2 p-2 bg-white rounded-full transform -translate-y-1/2"
              onClick={() => handlePrevNext('prev')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute top-1/2 right-2 p-2 bg-white rounded-full transform -translate-y-1/2"
              onClick={() => handlePrevNext('next')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div 
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 overflow-x-auto whitespace-nowrap py-2 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex space-x-2">
                {filteredMedia.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`w-16 h-16 relative overflow-hidden rounded-md cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={index === currentIndex ? { scale: 1.2, opacity: 1 } : { scale: 1, opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      setSelectedMedia(item)
                      setCurrentIndex(index)
                    }}
                  >
                    {item.type === 'image' ? (
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={item.caption}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {isShareOpen && selectedMedia && (
        <ShareButtons
          url={selectedMedia.url}
          title={selectedMedia.caption}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </div>
  )
}

