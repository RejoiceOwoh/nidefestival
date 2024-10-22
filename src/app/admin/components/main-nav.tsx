"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Package2, Settings, ShoppingCart, LucideIcon } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "../../../lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import React from "react"
import { UserButton } from "@clerk/nextjs"

interface NavItem {
  href: string
  icon: keyof typeof iconComponents
  label: string
}

const iconComponents: { [key: string]: LucideIcon } = {
  Home,
  Package,
  Package2,
  Settings,
  ShoppingCart,
}

const defaultNavItems: NavItem[] = [
  { href: "/admin", icon: "Home", label: "Dashboard" },
  { href: "/admin/orders", icon: "ShoppingCart", label: "Orders" },
  { href: "/admin/products", icon: "Package", label: "Products" },
]

const MotionLink = motion(Link)

const navVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export function AdminNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const response = await fetch('/api/admin/nav-items')
        if (!response.ok) {
          throw new Error('Failed to fetch nav items')
        }
        const data = await response.json()
        setNavItems(data)
      } catch (error) {
        console.error('Error fetching nav items:', error)
        setNavItems(defaultNavItems)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNavItems()
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            borderRadius: ["50%", "20%", "50%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity
          }}
          className="w-8 h-8 bg-primary"
        />
      </div>
    )
  }

  return (
    <motion.aside 
      className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="flex flex-col h-full justify-between py-5">
        <nav className="flex flex-col items-center gap-4 px-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base overflow-hidden"
            >
              <Image
                src="/logo.png"
                alt="Afrigold Logo"
                width={60}
                height={60}
                className="w-full h-full object-cover transition-all group-hover:scale-110"
              />
              <span className="sr-only">Acefoods Global</span>
            </Link>
          </motion.div>
          <AnimatePresence>
            {navItems.map((item) => (
              <motion.div key={item.href} variants={itemVariants}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MotionLink
                        href={item.href}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                          pathname === item.href && "bg-accent text-accent-foreground"
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {iconComponents[item.icon] && 
                          React.createElement(iconComponents[item.icon], { 
                            className: cn(
                              "h-5 w-5",
                              pathname === item.href ? "text-accent-foreground" : "text-muted-foreground"
                            )
                          })}
                        <span className="sr-only">{item.label}</span>
                      </MotionLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>
        <motion.nav 
          className="flex flex-col items-center gap-4 px-2"
          variants={itemVariants}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MotionLink
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserButton />
                </MotionLink>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.nav>
      </div>
    </motion.aside>
  )
}
