import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'

interface Partner {
  id: number
  name: string
  logo: string
}

interface PartnerCarouselProps {
  partners: Partner[]
}

export default function PartnerCarousel({ partners }: PartnerCarouselProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="overflow-hidden py-12"
    >
      <motion.div 
        className="flex space-x-8"
        animate={{ x: [0, -100 * partners.length] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: partners.length * 5,
            ease: "linear",
          },
        }}
      >
        {[...partners, ...partners].map((partner, index) => (
          <motion.div
            key={`${partner.id}-${index}`}
            className="flex-shrink-0 w-48"
            variants={itemVariants}
          >
            <Image 
              src={partner.logo || "/placeholder.svg"} 
              alt={partner.name} 
              width={200} 
              height={100} 
              className="w-full h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
            />
            <p className="text-center mt-2 font-medium text-gray-700">{partner.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

