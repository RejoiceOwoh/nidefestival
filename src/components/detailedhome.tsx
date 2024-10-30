'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Import motion components dynamically
import dynamic from 'next/dynamic'
const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: false })

export default function DetailedHome() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            Afrigold Palm Oil Originality
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-500">
            Bringing the richness of Nigeria{"'"}s agricultural heritage to your kitchen.
          </p>
        </MotionDiv>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <MotionDiv
            className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              alt="Afrigold Palm Oil Production"
              src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218622/_LUP8379_z3nzi5.png"
              fill
              style={{ objectFit: 'cover' }}
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </MotionDiv>

          <MotionDiv
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6 sm:p-8">
                <article className="space-y-4 text-gray-600">
                  <p>
                    Afrigold Palm Oil is a UK-based brand with deep Nigerian roots. We believe in delivering pure, nutrient-rich palm oil that embodies the richness of Nigeria{"'"}s agricultural heritage. Our journey started with a simple idea: bringing premium, natural palm oil to homes and kitchens worldwide, ensuring every drop contributes to a healthier and tastier cooking experience.
                  </p>
                  <h3 className="text-xl font-semibold text-primary">Our Mission</h3>
                  <p>
                    To offer high-quality, ethically-sourced palm oil that enriches lives and promotes sustainable agricultural practices.
                  </p>
                  <h3 className="text-xl font-semibold text-primary">Why Choose Us?</h3>
                  <p>
                    Afri Gold Palm Oil ensures the finest quality through rigorous sourcing and production standards. From local Nigerian farms to our eco-friendly packaging, we take pride in the purity, flavor, and health benefits our palm oil provides.
                  </p>
                </article>
                <div className="mt-6">
                  <Link href="/about" passHref>
                    <Button variant="outline" className="group text-primary">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
