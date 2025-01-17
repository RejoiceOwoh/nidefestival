import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock } from 'lucide-react'

interface NewsCardProps {
  news: {
    id: number
    title: string
    excerpt: string
    date: string
    readTime: string
    image: string
    category: string
  }
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/news/${news.id}`}>
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48">
            <Image
              src={news.image || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
            />
            <Badge className="absolute top-2 left-2 z-10">{news.category}</Badge>
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{news.title}</h3>
            <p className="text-gray-600 line-clamp-3">{news.excerpt}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{news.readTime} read</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

