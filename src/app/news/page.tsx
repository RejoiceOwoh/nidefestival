'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight, Search } from 'lucide-react'
import NewsCard from '@/components/NewsCard'
import ExternalNewsCard from '@/components/ExternalNewsCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// This would be replaced with actual data fetching in a real application
import { fetchNews, fetchExternalNews } from '@/data/news'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("internal")
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [page, setPage] = useState(1)

  const internalNews = fetchNews({ page, category, searchTerm })
  const externalNews = fetchExternalNews({ page, searchTerm })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    // Trigger search - in a real app, this would refetch data
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
    // In a real app, this would fetch more data and append to the existing list
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365449/pexels-ogonna-sylvester-ogbu-1047836026-20410318_xyswxi.jpg"
          alt="News & Media Banner"
          fill
          className="brightness-50 object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white text-center">
            News & <span className="text-[#E67E22]">Media</span>
          </h1>
        </motion.div>
      </header>

      {/* News Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex gap-4">
              <Button 
                variant={activeTab === "internal" ? "default" : "outline"}
                onClick={() => setActiveTab("internal")}
              >
                NIDEFEST Updates
              </Button>
              <Button 
                variant={activeTab === "external" ? "default" : "outline"}
                onClick={() => setActiveTab("external")}
              >
                Media Coverage
              </Button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <Input 
                type="search" 
                placeholder="Search news..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button type="submit"><Search className="w-4 h-4" /></Button>
            </form>
          </div>

          {activeTab === "internal" && (
            <div className="mb-8">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="announcements">Announcements</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="interviews">Interviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {activeTab === "internal" 
              ? internalNews.map((news) => <NewsCard key={news.id} news={news} />)
              : externalNews.map((news) => <ExternalNewsCard key={news.id} news={news} />)
            }
          </motion.div>

          {(internalNews.length > 0 || externalNews.length > 0) && (
            <div className="mt-12 text-center">
              <Button onClick={loadMore} variant="outline" size="lg">
                Load More {activeTab === "internal" ? "Updates" : "Coverage"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

