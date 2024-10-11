'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Upload,
  PlusCircle,
  Search, // Import Search here
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AdminNav } from '@/app/admin/components/main-nav';
import {
  Table,          // Import Table component
  TableBody,      // Import TableBody component
  TableCell,      // Import TableCell component
  TableHead,      // Import TableHead component
  TableHeader,    // Import TableHeader component
  TableRow,       // Import TableRow component
} from '@/components/ui/table'; // Assuming these are from the table UI component

export default function NewEditProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    status: 'draft',
    category: '',
    subcategory: '',
    imageUrl: '',
    soldOut: false,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  // Prefetch product details for editing
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setForm({
          ...form,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          status: data.status,
          category: data.category || '',
          subcategory: data.subcategory || '',
          imageUrl: data.imageUrl,
          soldOut: data.soldOut,
        });
        setImagePreview(data.imageUrl); // Set existing image preview
      };
      fetchProduct();
    }
  }, [productId]);

  // Handle image upload with Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // Cloudinary upload preset

      const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setForm({ ...form, imageUrl: data.secure_url });
      setImagePreview(data.secure_url); // Set image preview
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const method = productId ? 'PUT' : 'POST';
    const endpoint = productId ? `/api/products/${productId}` : '/api/products';

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/admin/products');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* Breadcrumb */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{productId ? 'Edit Product' : 'New Product'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <form onSubmit={handleSubmit}>
            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Enter the details of the product.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock */}
            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>Manage the stock of the product.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>GGPC-001</TableCell>
                      <TableCell>
                        <Input
                          id="stock-1"
                          type="number"
                          value={form.stock}
                          onChange={(e) => setForm({ ...form, stock: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input id="price-1" type="number" defaultValue="99.99" />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup type="single" defaultValue="s">
                          <ToggleGroupItem value="s">S</ToggleGroupItem>
                          <ToggleGroupItem value="m">M</ToggleGroupItem>
                          <ToggleGroupItem value="l">L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Product Category */}
            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Select
                      value={form.subcategory}
                      onValueChange={(value) => setForm({ ...form, subcategory: value })}
                    >
                      <SelectTrigger id="subcategory">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={form.status}
                  onValueChange={(value) => setForm({ ...form, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="soldOut">Sold Out</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Product Image */}
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Upload a product image.</CardDescription>
              </CardHeader>
              <CardContent>
                {imagePreview && (
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover mb-4"
                    height="300"
                    src={imagePreview}
                    width="300"
                  />
                )}
                <input type="file" onChange={handleImageUpload} />
              </CardContent>
            </Card>

            {/* Archive Product */}
            <Card>
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="sm">Archive Product</Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <Button type="submit">{productId ? 'Update Product' : 'Add Product'}</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
