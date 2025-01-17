import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, ExternalLink } from 'lucide-react'

interface ExternalNewsCardProps {
  news: {
    id: number
    title: string
    source: string
    date: string
    image: string
    url: string
  }
}

export default function ExternalNewsCard({ news }: ExternalNewsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <a href={news.url} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48">
            <Image
              src={news.image || "/placeholder.svg"}
              alt={news.title}
              fill
              className="object-cover"
            />
            <Badge variant="secondary" className="absolute top-2 left-2 z-10">{news.source}</Badge>
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{news.title}</h3>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
            <span className="text-[#E67E22] hover:text-[#D35400] transition-colors flex items-center">
              Read Article
              <ExternalLink className="w-4 h-4 ml-1" />
            </span>
          </CardFooter>
        </Card>
      </a>
    </motion.div>
  )
}

