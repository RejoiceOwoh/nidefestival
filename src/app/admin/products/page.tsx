"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ListFilter,
  PlusCircle,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminNav } from '../components/main-nav';
import MobileAdminNav from '../components/MobileAdminNav';
import DeleteProductDialog from './components/alertdialogue'; // Import the new DeleteProductDialog component
import { UserButton } from '@clerk/nextjs';
import { AdminBreadcrumb } from "../components/AdminBreadcrumb";
import { SearchInput } from "../components/SearchInput";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  soldOut: boolean;
  createdAt: string;
  imageUrl: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products dynamically from your backend API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products', {
        method: 'GET',
      });
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Function to refresh the product list after a successful deletion
  const handleDeleteSuccess = (deletedProductId: number) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Products", href: "/admin/products" },
    { label: "All Products" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileAdminNav />
          <AdminBreadcrumb items={breadcrumbItems} />
          <SearchInput className="ml-auto" />
          <UserButton />
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                    <DropdownMenuItem>Archived</DropdownMenuItem>
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

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead className="hidden md:table-cell">Total Sales</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image alt="Product image" className="aspect-square rounded-md object-cover" height="64" src={product.imageUrl || '/placeholder.svg'} width="64" />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge variant={product.soldOut ? 'outline' : 'secondary'}>{product.soldOut ? 'Sold Out' : 'In Stock'}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">${product.price}</TableCell>
                          <TableCell className="hidden md:table-cell">0</TableCell>
                          <TableCell className="hidden md:table-cell">{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {/* Edit Product Link */}
                              <Link href={`/admin/products/newedit?id=${product.id}`}>
                                <Button variant="outline" size="sm">Edit</Button>
                              </Link>
                              {/* DeleteProductDialog */}
                              <DeleteProductDialog 
                                productId={product.id} 
                                productName={product.name} 
                                onDeleteSuccess={() => handleDeleteSuccess(product.id)} 
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">Showing {products.length} products</div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
