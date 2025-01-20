"use client"

import { useEffect, useState } from "react"
import CalendarOverview from "@/components/CalendarOverview"
import FestivalOverview from "@/components/FestivalOverview"
import GovernorsSection from "@/components/GovernorsSection"
import HeroSection from "@/components/HeroSection"
import Countdown from "@/components/Countdown"
import { festivalData } from "@/data/event"
import NewsSection from "@/components/NewsSection"
import SponsorsPartnersSection from "@/components/SponsorsPartnersSection"
import AboutUsSection from "@/components/AboutUsSection"

export default function Home() {
  const [showCountdown, setShowCountdown] = useState(true)

  useEffect(() => {
    const checkDate = () => {
      const now = new Date()
      const festivalStart = new Date(festivalData.startDate)
      setShowCountdown(now < festivalStart)
    }

    checkDate()
    const timer = setInterval(checkDate, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <HeroSection />
      <AboutUsSection />
      <GovernorsSection />
      {showCountdown ? <Countdown /> : <CalendarOverview />}
      <CalendarOverview />
      <FestivalOverview />
      <SponsorsPartnersSection />
      <NewsSection />
    </div>
  )
}

