"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { sponsorsData, partnersData } from "@/data/partners-sponsors"

interface LogoScrollerProps {
  items: any[];
  direction: string;
}

const LogoScroller: React.FC<LogoScrollerProps> = ({ items, direction }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{
          x: direction === "left" ? ["-100%", "0%"] : ["0%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={`${item.id}-${index}`} className="inline-block mx-4">
            <Image
              src={item.logo || "/placeholder.svg"}
              alt={item.name}
              width={100}
              height={100}
              className="w-24 h-24 object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export default function SponsorsPartnersSection() {
  const [allSponsors, setAllSponsors] = useState<Sponsor[]>([])

  useEffect(() => {
    const sponsors = [...sponsorsData.gold, ...sponsorsData.silver, ...sponsorsData.bronze, ...sponsorsData.others]
    setAllSponsors(sponsors)
  }, [])

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 relative inline-block">
          Our Sponsors and Partners
          <span className="absolute bottom-0 left-0 w-full h-1 bg-[#E67E22] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </h2>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-4 text-center">Sponsors</h3>
          <LogoScroller items={allSponsors} direction="left" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center">Partners</h3>
          <LogoScroller items={partnersData} direction="right" />
        </div>
        <div className="text-center mt-12">
          <Link
            href="/sponsors-partners"
            className="inline-block bg-[#E67E22] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#D35400] transition-colors"
          >
            View All Sponsors and Partners
          </Link>
        </div>
      </div>
    </section>
  )
}

