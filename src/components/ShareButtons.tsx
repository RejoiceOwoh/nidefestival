import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const shareUrl = encodeURIComponent(`https://yourdomain.com${url}`)
  const shareTitle = encodeURIComponent(title)

  return (
    <div className="flex space-x-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank')}
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`, '_blank')}
      >
        <Linkedin className="w-4 h-4" />
      </Button>
    </div>
  )
}

