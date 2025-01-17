'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CalendarIcon, ArrowLeft, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import RichTextContent from '@/components/RichTextContent'
import RelatedArticles from '@/components/RelatedArticles'
import ShareButtons from '@/components/ShareButtons'

// This would be replaced with actual data fetching in a real application
import { fetchArticle, fetchRelatedArticles } from '@/data/news'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function NewsArticle() {
  const { id } = useParams()
  const article = fetchArticle(id as string)
  const relatedArticles = fetchRelatedArticles(id as string)

  if (!article) return <div>Article not found</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="relative h-[60vh] overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="brightness-50 object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-4 text-lg">{article.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-white space-x-4">
            <span className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {article.readTime} read
            </span>
          </div>
        </motion.div>
      </header>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            className="bg-white rounded-lg shadow-xl p-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <RichTextContent content={article.content} />
            
            <div className="mt-8 text-gray-600">
              <p>Written by: {article.author}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Link href="/news">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to News
                </Button>
              </Link>
              <ShareButtons url={`/news/${id}`} title={article.title} />
            </div>
          </motion.div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <RelatedArticles articles={relatedArticles} />
          </div>
        </div>
      </section>
    </div>
  )
}

