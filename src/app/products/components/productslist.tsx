"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Eye, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/useCart"
import Cart from "@/app/products/components/Cart"

interface Product {
    id: number
    name: string
    price: number
    description: string | null
    imageUrl: string
    baseShippingCost: number | null
    createdAt: string
    soldOut: boolean
    stock: number
    discountPricePerUnit: number | null
    bulkThreshold: number | null
    bulkShippingCost: number | null
    updatedAt: Date
    palletThreshold: number | null
    palletShippingCost: number | null
    maxCap: number | null
    quantityPerBox: number | null
}

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [addingToCart, setAddingToCart] = useState<number | null>(null)
    const [openDialog, setOpenDialog] = useState<number | null>(null)
    const { toast } = useToast()
    const { addToCart, cart } = useCart()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch("/api/products")
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error("Failed to fetch products:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = async (product: Product) => {
        if (product.soldOut) return

        setAddingToCart(product.id)

        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        addToCart({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            baseShippingCost: product.baseShippingCost,
            discountPricePerUnit: product.discountPricePerUnit,
            bulkThreshold: product.bulkThreshold,
            bulkShippingCost: product.bulkShippingCost,
            palletThreshold: product.palletThreshold,
            palletShippingCost: product.palletShippingCost,
            maxCap: product.maxCap,
            quantityPerBox: product.quantityPerBox,
            imageUrl: product.imageUrl,
            soldOut: product.soldOut,
            createdAt: new Date(product.createdAt),
            updatedAt: product.updatedAt
        })

        setAddingToCart(null)
        setOpenDialog(null)

        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        })
    }

    const isNewArrival = (createdAt: string) => {
        const productDate = new Date(createdAt)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return productDate > thirtyDaysAgo
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Discover Our <span className="text-primary">Premium</span> Collection
                </h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <AnimatePresence>
                        {loading
                            ? Array.from({ length: 8 }).map((_, index) => (
                                <motion.div
                                    key={`skeleton-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <Skeleton className="h-64 sm:h-80 w-full" />
                                        <CardContent className="p-4">
                                            <Skeleton className="h-6 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-full mb-4" />
                                            <div className="flex justify-between items-center">
                                                <Skeleton className="h-6 w-1/4" />
                                                <Skeleton className="h-8 w-8 rounded-full" />
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4">
                                            <Skeleton className="h-10 w-full" />
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))
                            : products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="group overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative h-64 sm:h-80">
                                            <Image
                                                src={product.imageUrl}
                                                alt={product.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {isNewArrival(product.createdAt) && !product.soldOut && (
                                                <Badge className="absolute top-2 right-2 bg-primary text-white">
                                                    New Arrival
                                                </Badge>
                                            )}
                                            {product.soldOut && (
                                                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                                                    Sold Out
                                                </Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
                                                {product.name}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <p className="text-xl font-bold text-primary">£{product.price.toFixed(2)}</p>
                                                <Dialog open={openDialog === product.id} onOpenChange={(open) => setOpenDialog(open ? product.id : null)}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="icon" className="rounded-full">
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Quick view</span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>{product.name}</DialogTitle>
                                                            <DialogDescription>Product Details</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="relative h-64 w-full">
                                                                <Image
                                                                    src={product.imageUrl}
                                                                    alt={product.name}
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                    className="rounded-lg"
                                                                />
                                                            </div>
                                                            <p className="text-sm text-gray-500">{product.description}</p>
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold">Price:</span>
                                                                <span>£{product.price.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold">Base Shipping:</span>
                                                                <span>£{(product.baseShippingCost ?? 0).toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold">Status:</span>
                                                                <span>{product.soldOut ? "Sold Out" : "In Stock"}</span>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                onClick={() => handleAddToCart(product)}
                                                                disabled={product.soldOut || addingToCart === product.id}
                                                                className="w-full"
                                                            >
                                                                {addingToCart === product.id ? (
                                                                    <>
                                                                        <motion.div
                                                                            initial={{ rotate: 0 }}
                                                                            animate={{ rotate: 360 }}
                                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                            className="mr-2"
                                                                        >
                                                                            <ShoppingCart className="h-4 w-4" />
                                                                        </motion.div>
                                                                        Adding...
                                                                    </>
                                                                ) : product.soldOut ? (
                                                                    "Sold Out"
                                                                ) : (
                                                                    <>
                                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                                        Add to Cart
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 bg-gray-50">
                                            <Button
                                                onClick={() => handleAddToCart(product)}
                                                className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                                                disabled={product.soldOut || addingToCart === product.id}
                                            >
                                                {addingToCart === product.id ? (
                                                    <>
                                                        <motion.div
                                                            initial={{ rotate: 0 }}
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="mr-2"
                                                        >
                                                            <ShoppingCart className="h-4 w-4" />
                                                        </motion.div>
                                                        Adding...
                                                    </>
                                                ) : product.soldOut ? (
                                                    "Sold Out"
                                                ) : (
                                                    <>
                                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
