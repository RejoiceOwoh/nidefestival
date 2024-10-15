// src/app/products/components/cart.tsx

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { loadStripe } from "@stripe/stripe-js";
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import QuantitySelector from './quantity-selector'
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { TCCheckbox } from '@/components/TcCheckbox';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Cart({ cart, setCart }: { cart: { product: any; quantity: number }[], setCart: Function }) {
    const [open, setOpen] = useState(false);

    const handleRemove = (productId: number) => {
        setCart((prevCart: any) => prevCart.filter((item: any) => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setCart((prevCart: any) =>
            prevCart.map((item: any) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Calculate total price and shipping
    const total = cart.reduce((acc: any, item: any) => {
        const productTotal = item.product.price * item.quantity;
        const shippingTotal = item.product.shippingCost * item.quantity;
        return {
            price: acc.price + productTotal,
            shipping: acc.shipping + shippingTotal,
        };
    }, { price: 0, shipping: 0 });

    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-primary text-white hover:bg-primary-700">
                View Cart
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll">
                        <SheetHeader>
                            <SheetTitle>Shopping Cart</SheetTitle>
                            <SheetDescription>Enter cart details and proceed to checkout</SheetDescription>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            {cart.length === 0 ? (
                                <p className="text-center">Your cart is empty.</p>
                            ) : (
                                <div className="mt-8">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cart.map((item: any) => (
                                            <li key={item.product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <Image
                                                        alt={item.product.imageAlt}
                                                        src={item.product.imageUrl}
                                                        width={96}
                                                        height={96}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                ˝
                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>{item.product.name}</h3>
                                                            <div className="text-right">
                                                                <div className="flex flex-col items-end">
                                                                    <p className="text-lg font-semibold text-primary">£{item.product.price * item.quantity}</p>
                                                                    <p className="text-sm text-gray-500 line-through">£{item.product.price * item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-between">
                                                            <p className="text-sm font-medium text-gray-500">Shipping</p>
                                                            <div className="text-right">
                                                                <p className="text-sm font-semibold text-gray-600">£{item.product.shippingCost * item.quantity}</p>
                                                                <p className="text-xs text-gray-500 line-through">£{item.product.shippingCost * item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    </div>





                                                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                                        <QuantitySelector quantity={item.quantity} onQuantityChange={(newQuantity: number) => updateQuantity(item.product.id, newQuantity)} />
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => handleRemove(item.product.id)}
                                                            className="font-medium text-primary hover:text-primary-500"
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>


                        <SheetFooter className="border-t flex flex-col border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-700">
                                <p>Product Total</p>
                                <p>£{total.price}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p className="text-sm text-gray-500">Shipping Total</p>
                                <p className="text-sm text-gray-500">£{total.shipping}</p>

                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <p>Total</p>
                                <p>£{total.price + total.shipping}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                                Shipping takes 2-5 business days
                            </p>

                            <div className="mt-5">
                                <Button className='text-white w-full font-semibold flex items-center justify-center px-6 py-3'>
                                    Checkout
                                </Button>
                            </div>

                            <div className="mt-5 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="font-medium text-primary-600 hover:text-primary-500"
                                    >
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
