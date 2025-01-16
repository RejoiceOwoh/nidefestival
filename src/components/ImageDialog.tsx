'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ImageDialogProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
}

export default function ImageDialog({ isOpen, onClose, imageSrc, imageAlt }: ImageDialogProps) {
  const [scale, setScale] = useState(1)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setScale(prevScale => Math.min(Math.max(prevScale - e.deltaY * 0.01, 1), 3))
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                <motion.button
                  type="button"
                  className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <div className="relative w-full h-[80vh] overflow-hidden" onWheel={handleWheel}>
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <Image
                      src={imageSrc || "/placeholder.svg"}
                      alt={imageAlt}
                      layout="fill"
                      objectFit="contain"
                    />
                  </motion.div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

