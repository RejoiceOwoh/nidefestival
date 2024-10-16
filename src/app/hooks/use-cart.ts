import { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  imageAlt: string
  shippingCost: number
}

interface CartItem {
  product: Product
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce(
      (acc, item) => ({
        price: acc.price + item.product.price * item.quantity,
        shipping: acc.shipping + item.product.shippingCost * item.quantity,
      }),
      { price: 0, shipping: 0 }
    )
  }

  return {
    cart,
    items: cart, // Add this line to provide 'items' as an alias for 'cart'
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  }
}