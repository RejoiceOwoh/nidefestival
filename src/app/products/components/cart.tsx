'use client'

import { useState } from 'react'
import Image from 'next/image'
import { loadStripe } from "@stripe/stripe-js"
import { SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetClose, Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import QuantitySelector from './quantity-selector'
import { useCart } from '@/lib/useCart'
import { calculateItemPrice, calculateShipping, calculateTotalPrice, calculateTotalShipping, formatPrice } from '@/lib/cartUtils'

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

    return (
        <div className="flex flex-col h-full">
            <Sheet>
            <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>Review your items before checking out.</SheetDescription>
            </SheetHeader>

            <div className="flex-grow overflow-auto py-6">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <ul role="list" className="divide-y divide-gray-200">
                        {cart.map((item) => (
                            <li key={item.product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>{item.product.name}</h3>
                                            <p className="ml-4">{formatPrice(calculateItemPrice(item))}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Shipping: {formatPrice(calculateShipping(item))}</p>
                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="font-medium text-primary hover:text-primary/80"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <QuantitySelector
                                            quantity={item.quantity}
                                            onQuantityChange={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <SheetFooter className="border-t pt-6">
                <div className="w-full">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{formatPrice(calculateTotalPrice(cart))}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Shipping</p>
                        <p>{formatPrice(calculateTotalShipping(cart))}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>{formatPrice(calculateTotalPrice(cart) + calculateTotalShipping(cart))}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Button
                            onClick={handleCheckout}
                            disabled={isCheckingOut || cart.length === 0}
                            className="w-full"
                        >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                        </Button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
