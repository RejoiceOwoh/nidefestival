import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Sponsor {
  id: number
  name: string
  logo: string
  description: string
  website?: string
}

interface SponsorShowcaseProps {
  sponsors: {
    gold?: Sponsor[]
    silver?: Sponsor[]
    bronze?: Sponsor[]
    others?: Sponsor[]
  }
}

const medalIcons = {
  gold: "https://img.icons8.com/?size=100&id=33486&format=png&color=000000",
  silver: "https://img.icons8.com/?size=100&id=23876&format=png&color=000000",
  bronze: "https://img.icons8.com/?size=100&id=23875&format=png&color=000000",
  others: "https://img.icons8.com/?size=100&id=108789&format=png&color=000000",
}

export default function SponsorShowcase({ sponsors }: SponsorShowcaseProps) {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)

  const categoryColors = {
    gold: 'from-yellow-100 to-yellow-300',
    silver: 'from-gray-100 to-gray-300',
    bronze: 'from-orange-100 to-orange-300',
    others: 'from-blue-100 to-blue-300'
  }

  return (
    <>
      {Object.entries(sponsors).map(([category, categorySponsors]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Image 
              src={medalIcons[category as keyof typeof medalIcons] || "/placeholder.svg"}
              alt={`${category} medal`}
              width={30}
              height={30}
              className="mr-2"
            />
            {category.charAt(0).toUpperCase() + category.slice(1)} Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categorySponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} p-6 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105`}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedSponsor(sponsor)}
                >
                  <Image 
                    src={sponsor.logo || "/placeholder.svg"} 
                    alt={sponsor.name} 
                    width={200} 
                    height={100} 
                    className="w-full h-32 object-contain mb-4" 
                  />
                  <h3 className="text-lg font-semibold text-center text-gray-900">{sponsor.name}</h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedSponsor && (
          <Dialog open={!!selectedSponsor} onOpenChange={() => setSelectedSponsor(null)}>
            <DialogContent className="bg-white text-gray-900 border-gray-200">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedSponsor.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Image 
                  src={selectedSponsor.logo || "/placeholder.svg"} 
                  alt={selectedSponsor.name} 
                  width={300} 
                  height={150} 
                  className="w-full h-48 object-contain mb-4" 
                />
                <p className="text-gray-700 mb-4">{selectedSponsor.description}</p>
                {selectedSponsor.website && (
                  <a 
                    href={selectedSponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-[#E67E22] text-white px-4 py-2 rounded hover:bg-[#D35400] transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

