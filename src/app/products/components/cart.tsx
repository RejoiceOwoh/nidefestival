'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { TCCheckbox } from '@/components/TcCheckbox'
import QuantitySelector from './quantity-selector'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        originalPrice: '$100.00',
        discountedPrice: '$90.00',
        originalShipping: '$15.00',
        discountedShipping: '$10.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        originalPrice: '$40.00',
        discountedPrice: '$32.00',
        originalShipping: '$12.00',
        discountedShipping: '$8.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

export default function Cart() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-primary text-white hover:bg-primary-700">
                Open Shopping Cart
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll">
                        <SheetHeader>
                            <SheetTitle>Shopping Cart</SheetTitle>
                            <SheetDescription>Enter cart details and proceed to checkout</SheetDescription>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <li key={product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <Image
                                                        alt={product.imageAlt}
                                                        src={product.imageSrc}
                                                        width={96}
                                                        height={96}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.name}</a>
                                                            </h3>
                                                            <div className="text-right">
                                                                <div className="flex flex-col items-end">
                                                                    <p className="text-lg font-semibold text-primary">{product.discountedPrice}</p>
                                                                    <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <p className="text-sm font-medium text-gray-500">Shipping</p>
                                                            <div className="text-right">
                                                                <p className="text-sm font-semibold text-gray-600">{product.discountedShipping}</p>
                                                                <p className="text-xs text-gray-500 line-through">{product.originalShipping}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                                        <QuantitySelector />
                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                className="font-medium text-primary hover:text-primary-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <SheetFooter className="border-t flex flex-col border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-700">
                                <p>Product total</p>
                                <p>$262.00</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p className="text-sm text-gray-500">Shipping Total</p>
                                <p className="text-sm text-gray-500">$232</p>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <p>Total</p>
                                <p>$262.00</p>
                            </div>

                            <p className="mt-0.5 text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                                <TCCheckbox />
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
    )
}