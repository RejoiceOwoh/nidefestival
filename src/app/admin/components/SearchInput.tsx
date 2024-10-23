'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  type: 'order' | 'product' | 'customer'
  url: string
}

// This would typically come from your API or database
const fetchSearchResults = async (query: string): Promise<SearchResult[]> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data for demonstration
  const mockData: SearchResult[] = [
    { id: '1', title: 'Order #1234', type: 'order', url: '/admin/orders/1234' },
    { id: '2', title: 'Red Palm Oil', type: 'product', url: '/admin/products/2' },
    { id: '3', title: 'John Doe', type: 'customer', url: '/admin/customers/3' },
    { id: '4', title: 'Order #5678', type: 'order', url: '/admin/orders/5678' },
    { id: '5', title: 'Shea Butter', type: 'product', url: '/admin/products/5' },
  ]
  
  return mockData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase())
  )
}

export function SearchInput() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (query.length > 0) {
      setLoading(true)
      fetchSearchResults(query).then(data => {
        setResults(data)
        setLoading(false)
      })
    } else {
      setResults([])
    }
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          <Search className="mr-2 h-4 w-4" />
          {query || "Search..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput 
            placeholder="Search orders, products, or customers..." 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                "No results found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {results.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setOpen(false)
                    router.push(item.url)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.id === query ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    <span className="text-sm text-muted-foreground capitalize">{item.type}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}