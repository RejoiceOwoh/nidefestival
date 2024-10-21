'use client'

import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CTA() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const recipes = [
    { name: 'Native African Salad', image: 'https://res.cloudinary.com/dkjnkg7hd/image/upload/v1729520905/SAVE_20241021_152540_qj2jyo.jpg' },
    { name: 'Egusi Soup', image: 'https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727198510/Egusi_Soup_Recipe_-_How_to_cook_egusi_soup_pd3u7q.jpg' },
  ]

  const nextRecipe = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  }, [recipes.length])

  useEffect(() => {
    const intervalId = setInterval(nextRecipe, 5000)
    return () => clearInterval(intervalId)
  }, [nextRecipe])

  return (
    <section className="relative overflow-hidden bg-accent py-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727198510/Egusi_Soup_Recipe_-_How_to_cook_egusi_soup_pd3u7q.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-3xl font-bold text-primary md:text-4xl"
            >
              Oil Produced for Healthy Recipes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-lg text-accent-foreground/90"
            >
              Explore delicious and nutritious recipes made with Afri Gold Palm Oil. From Native Jollof rice and all native soups to modern fusion dishes, discover meals that are both healthy and flavorful.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild className="group bg-primary text-accent hover:bg-accent/90 hover:text-primary hover:border-primary border-2">
                <a href="/products">
                  Get Yours Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </div>
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-video"
                  >
                    <Image
                      src={recipes[activeIndex].image}
                      alt={recipes[activeIndex].name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                      <h3 className="text-xl font-semibold">{recipes[activeIndex].name}</h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button size="icon" variant="secondary" onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={nextRecipe}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
