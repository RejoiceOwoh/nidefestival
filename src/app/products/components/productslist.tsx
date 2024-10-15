"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Cart from "./cart"

interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  shippingCost: number
  rating: number // Added rating for each product
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === product.id)

      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Discover Our <span className="text-primary">Premium</span> Collection
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-2 right-2 bg-primary text-white">
                  New Arrival
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-primary">£{product.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-gray-50">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  )
}