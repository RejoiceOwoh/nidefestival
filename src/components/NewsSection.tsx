'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchNews, fetchExternalNews, NewsItem, ExternalNewsItem } from '@/data/news'

interface NewsCardProps {
  item: NewsItem | ExternalNewsItem;
  isExternal?: boolean;
}

const NewsCard = ({ item, isExternal = false }: NewsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        {isExternal ? (
          <p className="text-gray-600 mb-2">Source: {(item as ExternalNewsItem).source}</p>
        ) : (
          <p className="text-gray-600 mb-2">{(item as NewsItem).excerpt}</p>
        )}
        <p className="text-sm text-gray-500 mb-4">{new Date(item.date).toLocaleDateString()}</p>
        <Link
          href={isExternal ? (item as ExternalNewsItem).url : `/news/${item.id}`}
          className="text-[#E67E22] hover:text-[#D35400] font-semibold"
          target={isExternal ? "_blank" : "_self"}
        >
          Read More
        </Link>
      </div>
    </motion.div>
  )
}

export default function NewsSection() {
  const [internalNews, setInternalNews] = useState<NewsItem[]>([])
  const [externalNews, setExternalNews] = useState<ExternalNewsItem[]>([])

  useEffect(() => {
    setInternalNews(fetchNews({ page: 1, category: 'all', searchTerm: '' }))
    setExternalNews(fetchExternalNews({ page: 1, searchTerm: '' }))
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest News and Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {internalNews.slice(0, 3).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        <h3 className="text-2xl font-semibold mb-8">From the Press</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {externalNews.map((item) => (
            <NewsCard key={item.id} item={item} isExternal />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/news"
            className="inline-block bg-[#E67E22] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#D35400] transition-colors"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}
