'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CheckCircle, Truck, Headphones, Home, Info, Phone, Package, Shield, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const pageOptions = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'About Us', icon: Info, href: '/about' },
  { name: 'Contact Us', icon: Phone, href: '/contact' },
  { name: 'Products', icon: Package, href: '/products' },
  { name: 'Privacy Policy', icon: Shield, href: '/privacy-policy' },
]

const steps = [
  "Order Confirmed",
  "Processing",
  "Preparing for Shipment",
  "Ready for Delivery"
]

export default function SuccessPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(step => (step < steps.length - 1 ? step + 1 : step))
    }, 3000)

    return () => clearInterval(stepInterval)
  }, [])

  const commitments = useMemo(() => [
    { icon: Truck, text: "Lightning-fast delivery to your doorstep" },
    { icon: Headphones, text: "24/7 concierge-level customer support" },
    { icon: Shield, text: "Ironclad quality guarantee on all products" }
  ], [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/5">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-foreground">Purchase Successful!</h1>
          <p className="text-2xl text-muted-foreground">Thank you for your order. We{"'"}re excited to serve you!</p>
        </motion.div>

        {mounted && (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden shadow-2xl rounded-xl">
                <CardHeader className="bg-secondary text-secondary-foreground">
                  <CardTitle className="text-2xl">Order Progress</CardTitle>
                  <CardDescription className="text-secondary-foreground/80">Watch your order come to life</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Progress value={progress} className="mb-4" />
                  <div className="space-y-4">
                    <AnimatePresence>
                      {steps.map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ delay: index * 0.2 }}
                          className={`flex items-center ${index <= currentStep ? 'text-primary' : 'text-primary/40'}`}
                        >
                          <CheckCircle className={`mr-2 ${index <= currentStep ? 'opacity-100' : 'opacity-50'}`} />
                          <span>{step}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-2xl rounded-xl">
                <CardHeader className="bg-accent text-accent-foreground">
                  <CardTitle className="text-2xl">Our Commitment</CardTitle>
                  <CardDescription className="text-accent-foreground/80">Exceeding your expectations</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {commitments.map((item, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center space-x-3 text-primary/80"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <item.icon className="flex-shrink-0" />
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Detailed order information has been sent to your email. Expect frequent updates on your shipment status.</p>
                </CardFooter>
              </Card>
            </div>

            <Card className="mt-8 overflow-hidden shadow-2xl rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Continue Your Journey</CardTitle>
                <CardDescription>Explore more of what we have to offer</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {pageOptions.map((option, index) => (
                    <motion.div 
                      key={option.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full h-full flex flex-col items-center justify-center p-4 border-primary/20 hover:bg-primary/5 text-primary rounded-lg transition-colors"
                              asChild
                            >
                              <a href={option.href}>
                                <option.icon className="h-8 w-8 mb-2" />
                                <span>{option.name}</span>
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Visit our {option.name} page</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button 
                variant="outline" 
                className="text-lg text-foreground hover:bg-accent/5"
                onClick={() => window.location.href = '/'}
              >
                <Home className="mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
