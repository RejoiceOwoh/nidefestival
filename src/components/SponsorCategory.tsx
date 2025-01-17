import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Sponsor {
  id: number
  name: string
  logo: string
  description: string
}

interface SponsorCategoryProps {
  title: string
  sponsors: Sponsor[]
  bgColor: string
  textColor: string
}

export default function SponsorCategory({ title, sponsors, bgColor, textColor }: SponsorCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section 
      className={`mb-12 p-8 rounded-lg shadow-lg ${bgColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={`text-3xl font-bold mb-6 ${textColor}`}>{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sponsors.slice(0, 4).map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
      {sponsors.length > 4 && (
        <>
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8"
              >
                {sponsors.slice(4).map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-center mt-8">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="outline"
              className={`${textColor} border-current`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Show More
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </motion.section>
  )
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          whileHover={{ y: -5 }}
        >
          <Image 
            src={sponsor.logo || "/placeholder.svg"} 
            alt={sponsor.name} 
            width={200} 
            height={100} 
            className="w-full h-32 object-contain mb-4" 
          />
          <h3 className="text-lg font-semibold text-center">{sponsor.name}</h3>
        </motion.div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sponsor.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Image 
            src={sponsor.logo || "/placeholder.svg"} 
            alt={sponsor.name} 
            width={300} 
            height={150} 
            className="w-full h-48 object-contain mb-4" 
          />
          <p>{sponsor.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}



