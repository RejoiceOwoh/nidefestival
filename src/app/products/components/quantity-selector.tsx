'use client'

import { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1)

  const increment = () => setQuantity(prev => prev + 1)
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setQuantity(1)
    } else {
      const newQuantity = parseInt(value, 10)
      if (!isNaN(newQuantity) && newQuantity >= 1) {
        setQuantity(newQuantity)
      }
    }
  }

  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-white shadow-sm">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={decrement}
        aria-label="Decrease quantity"
        className="h-8 w-8 rounded-l-full"
      >
        <MinusIcon className="h-3 w-3" />
      </Button>
      <Input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="h-8 w-12 border-0 bg-transparent text-center text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={increment}
        aria-label="Increase quantity"
        className="h-8 w-8 rounded-r-full"
      >
        <PlusIcon className="h-3 w-3" />
      </Button>
    </div>
  )
}


function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
