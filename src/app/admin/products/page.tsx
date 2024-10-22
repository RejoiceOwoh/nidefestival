"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ListFilter,
  PlusCircle,
  File,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeleteProductDialog from './components/alertdialogue'; // Import the new DeleteProductDialog component
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  soldOut: boolean;
  createdAt: string;
  imageUrl: string;
  baseShippingCost: number | null;
  discountPricePerUnit: number | null;
  bulkThreshold: number | null;
  quantityPerBox: number | null;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string[]>(["All"]);
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [currentPage, statusFilter, stockFilter]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?page=${currentPage}&statusFilter=${statusFilter.join(',')}&stockFilter=${stockFilter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(prev => {
      if (status === "All") {
        return ["All"];
      }
      const newFilter = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev.filter(s => s !== "All"), status];
      return newFilter.length ? newFilter : ["All"];
    });
  };

  const handleDeleteSuccess = (deletedProductId: number) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
  };

 

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>All Products</CardTitle>
          <CardDescription>Manage your product inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Tabs value={stockFilter} onValueChange={setStockFilter}>
              <TabsList>
                <TabsTrigger value="all">All Stock</TabsTrigger>
                <TabsTrigger value="low">Low Stock</TabsTrigger>
                <TabsTrigger value="out">Out of Stock</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1 text-sm">
                    <ListFilter className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem 
                    checked={statusFilter.includes("All")}
                    onCheckedChange={() => handleStatusFilterChange("All")}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={statusFilter.includes("In Stock")}
                    onCheckedChange={() => handleStatusFilterChange("In Stock")}
                  >
                    In Stock
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem 
                    checked={statusFilter.includes("Sold Out")}
                    onCheckedChange={() => handleStatusFilterChange("Sold Out")}
                  >
                    Sold Out
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href={'/admin/products/newedit'}>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                </Button>
              </Link>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Bulk Threshold</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading skeletons
                Array(10).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-12 w-12 rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[40px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-[100px]" /></TableCell>
                  </TableRow>
                ))
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image alt="Product image" className="aspect-square rounded-md object-cover" height="48" src={product.imageUrl || '/placeholder.svg'} width="48" />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={product.soldOut ? 'outline' : 'secondary'}>{product.soldOut ? 'Sold Out' : 'In Stock'}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.bulkThreshold || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/admin/products/newedit?id=${product.id}`}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                        <DeleteProductDialog 
                          productId={product.id} 
                          productName={product.name} 
                          onDeleteSuccess={() => handleDeleteSuccess(product.id)} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i} onClick={() => setCurrentPage(i + 1)}>
                  <Button size="icon" variant={currentPage === i + 1 ? "default" : "outline"} className="h-8 w-8">
                    {i + 1}
                  </Button>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}
