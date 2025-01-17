'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ContentItem } from '../data/content'

interface DetailedPageTemplateProps {
  title: string;
  subtitle: string;
  content: ContentItem[];
  imageSrc: string;
  imageAlt: string;
  quickFacts: string[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function DetailedPageTemplate({ 
  title, 
  subtitle,
  content, 
  imageSrc, 
  imageAlt,
  quickFacts
}: DetailedPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Banner */}
      <header className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365458/pexels-rdne-6192557_1_zzgkwl.jpg"
          alt={`${title} Banner`}
          fill
          className="brightness-50 object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-2xl text-gray-200">{subtitle}</p>
        </motion.div>
      </header>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <motion.div 
              className="lg:w-2/3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                width={800}
                height={600}
                className="rounded-lg shadow-2xl mb-8"
              />
              <div className="prose prose-lg max-w-none">
                {content.map((item, index) => {
                  switch (item.type) {
                    case 'paragraph':
                      return <p key={index} className="mb-6">{item.content}</p>;
                    case 'heading':
                      return <h3 key={index} className="text-2xl font-bold mt-8 mb-4">{item.content}</h3>;
                    case 'list':
                      return (
                        <ul key={index} className="list-disc pl-6 mb-6">
                          {item.items?.map((listItem, listIndex) => (
                            <li key={listIndex} className="mb-2">{listItem}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/3 lg:sticky lg:top-24"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Facts</h2>
                <ul className="space-y-4">
                  {quickFacts.map((fact, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#E67E22] rounded-full mr-3"></span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

