"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function TCCheckbox() {
  return (
    <div className="flex mt-1 mb-1 items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
