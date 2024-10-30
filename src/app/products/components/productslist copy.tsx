"use client"

import { useEffect, useState } from "react";
import Image from "next/image"

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductsList2() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

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
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}  // You need to provide width
                  height={500} // You need to provide height
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  fill
                  style={{ objectFit: 'cover' }} // Optional: to make it responsive
                  placeholder="blur"  // Optional: for blur-up placeholder effect
                  blurDataURL="/path-to-blur-placeholder" // Optional: blur image placeholder
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href='#'>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">£{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
