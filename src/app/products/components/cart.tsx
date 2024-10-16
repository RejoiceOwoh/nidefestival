'use client'

import { useState } from 'react'
import Image from 'next/image'
import { loadStripe } from "@stripe/stripe-js"
import { SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose, Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import QuantitySelector from './quantity-selector'
import { CartItem, useCart } from '@/lib/useCart'
import { calculateItemPrice, calculateShipping, calculateTotalPrice, calculateTotalShipping, formatPrice, calculateOriginalPrice, calculateOriginalShipping } from '@/lib/cartUtils'
import { Trash2 } from 'lucide-react'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart()
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const handleCheckout = async () => {
        setIsCheckingOut(true)
        // Implement checkout logic here
        setIsCheckingOut(false)
    }

    const renderPrice = (currentPrice: number, originalPrice: number) => {
        if (isNaN(currentPrice) || !isFinite(currentPrice)) return null;
        if (isNaN(originalPrice) || !isFinite(originalPrice)) originalPrice = currentPrice;

        if (currentPrice < originalPrice) {
            const discountPercentage = ((originalPrice - currentPrice) / originalPrice) * 100
            return (
                <div className="flex flex-col items-end text-right">
                    <p className="text-sm font-medium text-gray-900">{formatPrice(currentPrice)}</p>
                    <p className="text-xs text-gray-500 line-through">{formatPrice(originalPrice)}</p>
                    <p className="text-xs text-green-600">-{discountPercentage.toFixed(0)}%</p>
                </div>
            )
        }
        return <p className="text-sm font-medium text-gray-900 text-right">{formatPrice(currentPrice)}</p>
    }

    const calculateTotalDiscount = (item: CartItem) => {
        const productDiscount = calculateOriginalPrice(item) - calculateItemPrice(item)
        const shippingDiscount = calculateOriginalShipping(item) - calculateShipping(item)
        const totalDiscount = productDiscount + shippingDiscount
        return isNaN(totalDiscount) || !isFinite(totalDiscount) ? 0 : totalDiscount
    }

    const totalCurrentPrice = calculateTotalPrice(cart) + calculateTotalShipping(cart)
    const totalOriginalPrice = cart.reduce((total, item) => total + calculateOriginalPrice(item) + calculateOriginalShipping(item), 0)
    const totalSavings = totalOriginalPrice - totalCurrentPrice

    return (
        <div className="flex flex-col h-full">
            <Sheet>
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>Review your items before checking out.</SheetDescription>
                </SheetHeader>

                <div className="flex-grow overflow-auto py-4">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.product.id} className="py-4">
                                    <div className="flex items-center">
                                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-2">
                                            <Image
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                width={56}
                                                height={56}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm font-medium text-gray-900 truncate pr-2">{item.product.name}</h3>
                                                {renderPrice(calculateItemPrice(item), calculateOriginalPrice(item))}
                                            </div>
                                            <div className="mt-1 flex justify-between items-center text-xs text-gray-500">
                                                <p>Qty: {item.quantity}</p>
                                                <p>Shipping: {formatPrice(calculateShipping(item))}</p>
                                            </div>
                                            <div className="mt-1 flex justify-between items-center">
                                                <QuantitySelector
                                                    quantity={item.quantity}
                                                    onQuantityChange={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {calculateTotalDiscount(item) > 0 && (
                                        <p className="mt-1 text-xs text-green-600 text-right">
                                            You save: {formatPrice(calculateTotalDiscount(item))}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <SheetFooter className="border-t pt-4">
                    <div className="w-full space-y-3">
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                            <p>Subtotal</p>
                            {renderPrice(calculateTotalPrice(cart), cart.reduce((total, item) => total + calculateOriginalPrice(item), 0))}
                        </div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                            <p>Shipping</p>
                            {renderPrice(calculateTotalShipping(cart), cart.reduce((total, item) => total + calculateOriginalShipping(item), 0))}
                        </div>
                        <div className="h-px bg-gray-200" />
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                            <p>Total</p>
                            {renderPrice(totalCurrentPrice, totalOriginalPrice)}
                        </div>
                        {totalSavings > 0 && !isNaN(totalSavings) && isFinite(totalSavings) && (
                            <p className="text-sm text-green-600 font-medium">You save: {formatPrice(totalSavings)}</p>
                        )}
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>Shipping costs are estimated and may be adjusted at checkout.</p>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            disabled={isCheckingOut || cart.length === 0}
                            className="w-full mt-4"
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </Button>
                        <div className="flex justify-center text-center text-xs text-gray-500">
                            <p>
                                or{' '}
                                <SheetClose asChild>
                                    <button className="font-medium text-primary hover:text-primary/80">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </SheetClose>
                            </p>
                        </div>
                    </div>
                </SheetFooter>
            </Sheet>
        </div>
    )
}

export default Cart
