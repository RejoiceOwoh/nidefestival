"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Eye, Check, Package, Truck, Users, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/useCart"
import { ScrollArea } from "@/components/ui/scroll-area"

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
                // Ensure products is always an array
                setProducts(Array.isArray(data.products) ? data.products : [])
            } catch (error) {
                console.error("Failed to fetch products:", error)
                setProducts([]) // Set to empty array on error
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

    const renderPricingTier = (label: string, price: number | null, shippingCost: number | null, quantityPerUnit: number | null, threshold: number | null) => {
        if (price === null) return null;
        
        return (
            <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="text-center">
                    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
                    <p className="mt-1">
                        <strong className="text-lg font-bold text-gray-900">£{price.toFixed(2)}</strong>
                        <span className="text-xs text-gray-500">{quantityPerUnit ? '/unit' : ''}</span>
                    </p>
                </div>
                <ul className="mt-4 space-y-2 text-xs">
                    {shippingCost !== null && (
                        <li className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" />
                            <span className="text-gray-600">£{shippingCost.toFixed(2)} delivery{quantityPerUnit ? '/unit' : ''}</span>
                        </li>
                    )}
                    {quantityPerUnit && (
                        <li className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-primary" />
                            <span className="text-gray-600">{quantityPerUnit} items/unit</span>
                        </li>
                    )}
                    {threshold && (
                        <li className="flex items-center gap-2">
                            <Scale className="h-4 w-4 text-primary" />
                            <span className="text-gray-600">Min. {threshold} units</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            <div className="container max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
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
                            : (Array.isArray(products) ? products : []).map((product) => (
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
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
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
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="icon" className="rounded-full">
                                                            <Eye className="h-4 w-4" />
                                                            <span className="sr-only">Quick view</span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col">
                                                        <DialogHeader className="flex-shrink-0">
                                                            <DialogTitle>{product.name}</DialogTitle>
                                                            <DialogDescription>Product Details</DialogDescription>
                                                        </DialogHeader>
                                                        <ScrollArea className="flex-grow overflow-y-auto">
                                                            <div className="space-y-4 pr-4">
                                                                <div className="relative h-64 w-full">
                                                                    <Image
                                                                        src={product.imageUrl}
                                                                        alt={product.name}
                                                                        fill
                                                                        sizes="(max-width: 550px) 100vw, 550px"
                                                                        className="object-cover rounded-lg"
                                                                    />
                                                                </div>
                                                                <p className="text-sm text-gray-500">{product.description}</p>
                                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                                    {renderPricingTier(
                                                                        "Single Item", 
                                                                        product.price, 
                                                                        product.baseShippingCost, 
                                                                        null, 
                                                                        null
                                                                    )}
                                                                    {product.bulkThreshold && renderPricingTier(
                                                                        `Bulk (${product.bulkThreshold}+ units)`, 
                                                                        product.discountPricePerUnit, 
                                                                        product.bulkShippingCost, 
                                                                        product.quantityPerBox, 
                                                                        product.bulkThreshold
                                                                    )}
                                                                    {product.palletThreshold && renderPricingTier(
                                                                        `Pallet (${product.palletThreshold}+ units)`, 
                                                                        product.discountPricePerUnit, 
                                                                        product.palletShippingCost, 
                                                                        product.quantityPerBox, 
                                                                        product.palletThreshold
                                                                    )}
                                                                </div>
                                                                {product.maxCap && (
                                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                                        <Users className="h-4 w-4 text-primary" />
                                                                        <span>Maximum order: {product.maxCap} units</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </ScrollArea>
                                                        <div className="flex-shrink-0 mt-6 pt-4 border-t">
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
                                                        </div>
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
