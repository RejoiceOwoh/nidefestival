import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Link, X } from 'lucide-react'

interface ShareButtonsProps {
  url: string
  title: string
  onClose: () => void
}

export default function ShareButtons({ url, title, onClose }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white p-6 rounded-lg shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Share</h2>
          <div className="flex space-x-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
            >
              <Link size={24} />
            </button>
          </div>
          {copied && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-600 mt-2"
            >
              Link copied to clipboard!
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

