import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface RelatedArticle {
  id: number
  title: string
  image: string
  excerpt: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link key={article.id} href={`/news/${article.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

