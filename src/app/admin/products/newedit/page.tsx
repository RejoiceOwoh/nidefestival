"use client"

import { useState, useEffect } from 'react';

import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AdminNav } from "../../components/main-nav"

import { useRouter, useSearchParams } from 'next/navigation'; // Add useSearchParams
import BreadcrumbComponent from '../components/breadcrumb';
import { UserButton } from '@clerk/nextjs';
import SearchInput from '../../components/SearchInput';
import SidebarSheet from '../../components/MobileSidebarSheet';
import BackButton from '../../components/BackButton';
import ProductTitle from '../components/ProductTitle';
import StockBadge from '../components/StockBadge';
import DiscardButton from '../../components/DiscardButton';




export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images."

export default function NewEdit() {

  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: string | number;
    stock: string | number;
    status: string;
    category: string;
    subcategory: string;
    imageUrl: string;
    soldOut: boolean;
    bulkThreshold: string | number;
    bulkShippingCost: string | number;
    palletThreshold: string | number;
    palletShippingCost: string | number;
    baseShippingCost: string | number;
    discountPricePerUnit: string | number;
    maxCap: string | number;
  }>({
    name: '',
    description: '',
    price: '',
    stock: '',
    status: 'draft',
    category: '',
    subcategory: '',
    imageUrl: '',
    soldOut: false,
    bulkThreshold: 0,
    bulkShippingCost: 0,
    palletThreshold: 0,
    palletShippingCost: 0,
    baseShippingCost: 0,
    discountPricePerUnit: 0,
    maxCap: 0,
  });


  // State for image preview
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
          bulkThreshold: data.bulkThreshold || 0,
          bulkShippingCost: data.bulkShippingCost || 0,
          palletShippingCost: data.palletShippingCost || 0,
          baseShippingCost: data.baseShippingCost || 0,
          discountPricePerUnit: data.discountPricePerUnit || 0,
          maxCap: data.maxCap || 0,
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
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        setForm({ ...form, imageUrl: data.secure_url });
        setImagePreview(data.secure_url); // Set image preview
      } catch (error) {
        console.error('Error uploading image:', error); // Error handling
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Validate groups
    const { valid, message } = validateGroups();
    if (!valid) {
      alert(message); // Show error to user
      return;
    }

    try {
      const method = productId ? 'PUT' : 'POST'; // Determine request method
      const endpoint = productId ? `/api/products/${productId}` : '/api/products'; // Determine API endpoint

      const body = JSON.stringify({
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        status: form.status,
        category: form.category,
        subcategory: form.subcategory,
        imageUrl: form.imageUrl,
        soldOut: form.soldOut,
        bulkThreshold: form.bulkThreshold,
        bulkShippingCost: form.bulkShippingCost,
        palletShippingCost: form.palletShippingCost,
        baseShippingCost: form.baseShippingCost,
        discountPricePerUnit: form.discountPricePerUnit,
        maxCap: form.maxCap,
      });

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      router.push('/admin/products'); // Redirect after success
    } catch (error) {
      console.error('Error submitting form:', error); // Error handling
    }
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add search logic here
  };

  // Helper function to check if all fields in a group are filled
  const isGroupComplete = (group: Record<string, string | number | null>) => {
    return Object.values(group).every((value) => value !== null && value !== '');
  };

  // Helper function to check if any field in a group is filled
  const isGroupPartiallyFilled = (group: Record<string, string | number | null>) => {
    return Object.values(group).some((value) => value !== null && value !== '') &&
      !isGroupComplete(group);
  };

  // Validation logic for each group
  const validateGroups = () => {
    const group1 = { name: form.name, description: form.description, price: form.price, stock: form.stock, baseShippingCost: form.baseShippingCost };
    const group2 = { bulkThreshold: form.bulkThreshold, discountPricePerUnit: form.discountPricePerUnit, bulkShippingCost: form.bulkShippingCost };
    const group3 = { palletThreshold: form.palletThreshold, palletShippingCost: form.palletShippingCost };

    if (isGroupPartiallyFilled(group1)) {
      return { valid: false, message: 'Please fill out all fields in Product Details (Group 1) or leave them empty.' };
    }

    if (isGroupPartiallyFilled(group2)) {
      return { valid: false, message: 'Please fill out all fields in Bulk Pricing & Shipping (Group 2) or leave them empty.' };
    }

    if (isGroupPartiallyFilled(group3)) {
      return { valid: false, message: 'Please fill out all fields in Pallet Shipping (Group 3) or leave them empty.' };
    }

    return { valid: true };
  };





  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarSheet />


          {/* Breadcrumb */}
          <BreadcrumbComponent current="Edit Product" />


          <SearchInput placeholder="Search Products..." onSearch={handleSearch} />
          <UserButton />



        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <BackButton />
              <ProductTitle />
              <StockBadge />
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <DiscardButton />
                <Button size="sm">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      {productId
                        ? "Update the basic details of your product."
                        : "Provide the necessary details to add a new product."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Name */}
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter the product name"
                          defaultValue={form.name || ""}
                          required
                          className="w-full"
                        />
                      </div>

                      {/* Description */}
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the product briefly (optional)"
                          defaultValue={form.description || ""}
                          className="min-h-32"
                        />
                      </div>

                      {/* Price */}
                      <div className="grid gap-3">
                        <Label htmlFor="price">Price (£) <span className="text-red-500">*</span></Label>
                        <Input
                          id="price"
                          type="text"
                          inputMode="decimal"
                          pattern="^\d*(\.\d{0,2})?$"
                          placeholder="£ 99.99"
                          value={form.price || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*(\.\d{0,2})?$/;
                            if (regex.test(value)) {
                              setForm({ ...form, price: value });
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value || "0").toFixed(2);
                            setForm({ ...form, price: value });
                          }}
                          required
                          className="w-full remove-arrows"
                        />
                      </div>

                      {/* Stock */}
                      <div className="grid gap-3">
                        <Label htmlFor="stock">Stock <span className="text-red-500">*</span></Label>
                        <Input
                          id="stock"
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9]*$"
                          placeholder="Enter stock quantity (e.g., 100)"
                          value={form.stock || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]*$/.test(value)) {
                              setForm({ ...form, stock: value });
                            }
                          }}
                          required
                          className="w-full remove-arrows"
                        />
                      </div>

                      {/* Base Shipping Cost */}
                      <div className="grid gap-3">
                        <Label htmlFor="baseShippingCost">Base Shipping Cost (£)</Label>
                        <Input
                          id="baseShippingCost"
                          type="text"
                          inputMode="decimal"
                          pattern="^\d*(\.\d{0,2})?$"
                          placeholder="£ 3.50"
                          value={form.baseShippingCost || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*(\.\d{0,2})?$/; // Allow numbers and max two decimal places
                            if (regex.test(value)) {
                              setForm({ ...form, baseShippingCost: value });
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value || "0").toFixed(2); // Format to 2 decimal places on blur
                            setForm({ ...form, baseShippingCost: value });
                          }}
                          className="w-full remove-arrows"
                        />
                      </div>

                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Pricing & Shipping</CardTitle>
                    <CardDescription>
                      Provide details for bulk orders. These apply when the bulk threshold is met.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Bulk Threshold */}
                      <div className="grid gap-3">
                        <Label htmlFor="bulkThreshold">Bulk Threshold</Label>
                        <Input
                          id="bulkThreshold"
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9]*$"
                          placeholder="Enter the bulk threshold"
                          value={form.bulkThreshold}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]*$/.test(value)) {
                              setForm({ ...form, bulkThreshold: parseInt(value, 10) || 0 });
                            }
                          }}
                        />
                      </div>

                      {/* Discounted Price per Unit */}
                      <div className="grid gap-3">
                        <Label htmlFor="discountPricePerUnit">Discount Price Per Unit (£)</Label>
                        <Input
                          id="discountPricePerUnit"
                          type="text"
                          inputMode="decimal"
                          pattern="^\d*(\.\d{0,2})?$"
                          placeholder="£ 8.50"
                          value={form.discountPricePerUnit || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*(\.\d{0,2})?$/; // Allow numbers and max two decimal places
                            if (regex.test(value)) {
                              setForm({ ...form, discountPricePerUnit: value });
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value || "0").toFixed(2); // Format to 2 decimal places on blur
                            setForm({ ...form, discountPricePerUnit: value });
                          }}
                          className="w-full remove-arrows"
                        />
                      </div>


                      {/* Bulk Shipping Cost */}
                      <div className="grid gap-3">
                        <Label htmlFor="bulkShippingCost">Bulk Shipping Cost (£)</Label>
                        <Input
                          id="bulkShippingCost"
                          type="text"
                          inputMode="decimal"
                          pattern="^\d*(\.\d{0,2})?$"
                          placeholder="£ 2.00"
                          value={form.bulkShippingCost || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*(\.\d{0,2})?$/; // Allow numbers and max two decimal places
                            if (regex.test(value)) {
                              setForm({ ...form, bulkShippingCost: value });
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value || "0").toFixed(2); // Format to 2 decimal places on blur
                            setForm({ ...form, bulkShippingCost: value });
                          }}
                          className="w-full remove-arrows"
                        />
                      </div>

                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pallet Shipping</CardTitle>
                    <CardDescription>
                      Define pallet shipping details for larger orders.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Pallet Threshold */}
                      <div className="grid gap-3">
                        <Label htmlFor="palletThreshold">Pallet Threshold</Label>

                        <Input
                          id="palletThreshold"
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9]*$"
                          placeholder="Enter the pallet threshold"
                          value={form.palletThreshold}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]*$/.test(value)) {
                              setForm({ ...form, palletThreshold: parseInt(value, 10) || 0 });
                            }
                          }}
                        />

                      </div>

                      {/* Pallet Shipping Cost */}
                      <div className="grid gap-3">
                        <Label htmlFor="palletShippingCost">Pallet Shipping Cost (£)</Label>
                        <Input
                          id="palletShippingCost"
                          type="text"
                          inputMode="decimal"
                          pattern="^\d*(\.\d{0,2})?$"
                          placeholder="£ 10.00"
                          value={form.palletShippingCost || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^\d*(\.\d{0,2})?$/; // Allow numbers and max two decimal places
                            if (regex.test(value)) {
                              setForm({ ...form, palletShippingCost: value });
                            }
                          }}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value || "0").toFixed(2); // Format to 2 decimal places on blur
                            setForm({ ...form, palletShippingCost: value });
                          }}
                          className="w-full remove-arrows"
                        />
                      </div>

                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Restrictions</CardTitle>
                    <CardDescription>
                      Set a maximum number of units a customer can order at once.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {/* Max Cap */}
                      <div className="grid gap-3">
                        <Label htmlFor="maxCap">Maximum Order Quantity</Label>
                        <Input
                          id="maxCap"
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9]*$"
                          placeholder="Enter max order quantity (e.g., 100)"
                          value={form.maxCap || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]*$/.test(value)) {
                              setForm({ ...form, maxCap: parseInt(value) || 0 });
                            }
                          }}
                          className="w-full remove-arrows"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>





                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
