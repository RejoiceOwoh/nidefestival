'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Event Schedule', href: '/schedule' },
  { name: 'Tickets', href: '/tickets' },
  { 
    name: 'Gallery', 
    href: '/gallery',
    subItems: [
      { name: 'Governors Gallery', href: '/gallery/governors' },
      { name: 'States Gallery', href: '/gallery/states' },
    ]
  },
  { name: 'News and Updates', href: '/news' },
  { name: 'Sponsors and Partners', href: '/sponsors' },
  { name: "FAQ's", href: '/faqs' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ease-in-out ${
    isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
  }`

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
            <Image 
                src="https://res.cloudinary.com/dnbnev9lr/image/upload/v1734444342/New_Project__20_-removebg-preview_1_md87x7.png"
                alt="Niger Delta Festival Logo"
                width={120}
                height={30}
                className="flex-shrink-0"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div key={item.name} className="relative ml-8 group">
                {item.subItems ? (
                  <>
                    <button
                      className="flex items-center text-gray-800 hover:text-[#E67E22] transition-colors"
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-gray-800 hover:text-[#E67E22] transition-colors ${
                      pathname === item.href ? 'font-semibold text-[#E67E22]' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-[#E67E22] focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <button
                        className="w-full text-left block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#E67E22] hover:bg-gray-50"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        {item.name}
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4"
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-[#E67E22] hover:bg-gray-50"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium hover:text-[#E67E22] hover:bg-gray-50 ${
                        pathname === item.href ? 'text-[#E67E22]' : 'text-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

