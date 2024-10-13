"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Cart from "./cart";

const products = [
    {
        id: 1,
        name: 'Bottle of AfriGold Palm Oil',
        href: 'https://buy.stripe.com/4gw6qa27ca1LgmI3cc',
        imageSrc: 'https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218421/GOLD2_wozmcv.png',
        imageSrc2: 'https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218462/_LUP8385_yy0ku0.png',
        imageAlt: "Bottle of Afrigold Palm Oil",
        price: '£10.99',
        color: '',
    },
    // More products...
]

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

export default function ProductsList() {

    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Add product to the cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="group block overflow-hidden">
                                <div className="relative h-[350px] sm:h-[450px] overflow-hidden">
                                    {/* First Image */}
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={500}   // Provide appropriate width
                                        height={500}  // Provide appropriate height
                                        layout="responsive" // Makes image responsive
                                        className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-80 group-hover:scale-110"
                                    />
                                </div>

                                <div className="relative bg-white pt-3">
                                    <h3 className="text-sm text-gray-700 transition-all duration-300 ease-in-out group-hover:underline group-hover:underline-offset-4">
                                        {product.name}
                                    </h3>

                                    <div className="mt-1.5 flex items-center justify-between text-gray-900">
                                        <p className="tracking-wide">£{product.price}</p>

                                        <p className="text-xs uppercase tracking-wide">{product.description}</p>
                                    </div>
                                </div>
                                <div className="pt-3 text-center object-center">
                                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                                <Cart />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
