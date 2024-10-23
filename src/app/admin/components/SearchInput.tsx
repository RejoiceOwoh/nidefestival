'use client';

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchResult {
  id: string;
  title: string;
  type: 'order' | 'product' | 'customer';
  url: string;
}

// Mock data for demonstration
const mockData: SearchResult[] = [
  { id: '1', title: 'Order #1234', type: 'order', url: '/admin/orders/1234' },
  { id: '2', title: 'Red Palm Oil', type: 'product', url: '/admin/products/2' },
  { id: '3', title: 'John Doe', type: 'customer', url: '/admin/customers/3' },
  // Add more mock items as needed
];

export function SearchInput() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    // Filter mock data based on query
    const filteredResults = mockData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);

    // In a real application, you would fetch results from an API here
    // const fetchResults = async () => {
    //   try {
    //     const response = await fetch(`/api/admin-search?query=${encodeURIComponent(query)}`);
    //     if (!response.ok) throw new Error('Search failed');
    //     const data = await response.json();
    //     setResults(data.results);
    //   } catch (error) {
    //     console.error("Search error:", error);
    //     setResults([]);
    //   }
    // };
    // fetchResults();
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!open) setOpen(true);
  };

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setOpen(false);
    router.push(result.url);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-4"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Results">
              {results.map((result) => (
                <CommandItem key={result.id} onSelect={() => handleSelect(result)}>
                  <div>
                    <div className="font-medium">{result.title}</div>
                    <div className="text-sm text-muted-foreground capitalize">{result.type}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// USAGE
// import SearchInput from './components/SearchInput'; // Adjust the path

// export default function ProductForm() {
//   const handleSearch = (query: string) => {
//     console.log('Searching for:', query);
//     // Add search logic here
//   };

//   return (
//     <div >
//       {/* Other components */}

//         <SearchInput placeholder="Search Products..." onSearch={handleSearch} />

//       {/* Rest of your content */}
//     </div>
//   );
// }
