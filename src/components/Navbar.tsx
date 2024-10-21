'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Menu, X, Home, Info, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/useCart"
import Cart from "@/app/products/components/Cart"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { cart } = useCart()

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleViewCart = () => {
    setMobileMenuOpen(false)
    setIsCartOpen(true)
  }

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-background"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="flex w-full items-center justify-between p-4 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Acefoods Global</span>
                <Image
                  src="/logo.png"
                  alt="Afrigold Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    {cart.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 flex items-center justify-center"
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <Cart />
                </SheetContent>
              </Sheet>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="text-foreground"
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold leading-6 flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                    pathname === item.href
                      ? "text-white bg-primary"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="relative"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    <span>Cart</span>
                    {cart.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 flex items-center justify-center"
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <Cart />
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <Link
                href="/"
                className="-m-1.5 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Acefoods Global</span>
                <Image
                  src="/logo.png"
                  alt="Afrigold Logo"
                  width={32}
                  height={32}
                  style={{ height: '32px', width: 'auto' }}
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 flex items-center space-x-2 ${
                        pathname === item.href
                          ? "text-white bg-primary"
                          : "text-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                    onClick={handleViewCart}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    <span>View Cart</span>
                    {cart.length > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 flex items-center justify-center"
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-xl"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative mt-6 flex-1 px-4 sm:px-6">
                <Cart />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
