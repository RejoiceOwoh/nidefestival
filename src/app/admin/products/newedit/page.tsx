"use client"

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Upload, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DeleteProductDialog from '../components/alertdialogue';
import BackButton from '../../components/BackButton';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stock: string;
  imageUrl: string;
  soldOut: boolean;
  bulkThreshold: string;
  bulkShippingCost: string;
  palletThreshold: string;
  palletShippingCost: string;
  baseShippingCost: string;
  discountPricePerUnit: string;
  maxCap: string;
  quantityPerBox: string;
}

export default function NewEdit() {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    soldOut: false,
    bulkThreshold: '',
    bulkShippingCost: '',
    palletThreshold: '',
    palletShippingCost: '',
    baseShippingCost: '',
    discountPricePerUnit: '',
    maxCap: '',
    quantityPerBox: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setForm({
        ...data,
        price: data.price.toString(),
        stock: data.stock.toString(),
        bulkThreshold: data.bulkThreshold?.toString() || '',
        bulkShippingCost: data.bulkShippingCost?.toString() || '',
        palletThreshold: data.palletThreshold?.toString() || '',
        palletShippingCost: data.palletShippingCost?.toString() || '',
        baseShippingCost: data.baseShippingCost?.toString() || '',
        discountPricePerUnit: data.discountPricePerUnit?.toString() || '',
        maxCap: data.maxCap?.toString() || '',
        quantityPerBox: data.quantityPerBox?.toString() || '',
      });
      setImagePreview(data.imageUrl);
    } catch (error) {
      console.error('Error fetching product:', error);
      setGlobalError('Failed to fetch product details.');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    } else {
      setIsLoading(false);
    }
  }, [productId, fetchProduct]);

  const validateForm = useCallback((): Partial<ProductForm> => {
    const newErrors: Partial<ProductForm> = {};
    if (!form.name) newErrors.name = 'Product name is required';
    if (!form.price || isNaN(parseFloat(form.price))) newErrors.price = 'Valid price is required';
    if (!form.stock || isNaN(parseInt(form.stock, 10))) newErrors.stock = 'Valid stock quantity is required';
    // Add more validations as needed
    return newErrors;
  }, [form]);

  useEffect(() => {
    const newErrors = validateForm();
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [validateForm]);

  const handleInputChange = (field: keyof ProductForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Image upload failed');
        const data = await res.json();
        setForm(prev => ({ ...prev, imageUrl: data.secure_url }));
        setImagePreview(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        setGlobalError('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGlobalError(null);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const method = productId ? 'PUT' : 'POST';
      const endpoint = productId ? `/api/products/${productId}` : `/api/products`;

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
          bulkThreshold: form.bulkThreshold ? parseInt(form.bulkThreshold, 10) : null,
          bulkShippingCost: form.bulkShippingCost ? parseFloat(form.bulkShippingCost) : null,
          palletThreshold: form.palletThreshold ? parseInt(form.palletThreshold, 10) : null,
          palletShippingCost: form.palletShippingCost ? parseFloat(form.palletShippingCost) : null,
          baseShippingCost: form.baseShippingCost ? parseFloat(form.baseShippingCost) : null,
          discountPricePerUnit: form.discountPricePerUnit ? parseFloat(form.discountPricePerUnit) : null,
          maxCap: form.maxCap ? parseInt(form.maxCap, 10) : null,
          quantityPerBox: form.quantityPerBox ? parseInt(form.quantityPerBox, 10) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit the form');

      router.push('/admin/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      setGlobalError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSuccess = () => {
    router.push('/admin/products');
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 pb-16">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Tabs>
          <TabsList className="grid w-full grid-cols-4">
            {['Details', 'Pricing', 'Shipping', 'Image'].map((tab) => (
              <Skeleton key={tab} className="h-10" />
            ))}
          </TabsList>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      {globalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {productId ? "Edit" : "Add"} Product
            </h1>
            <p className="text-sm text-gray-500">
              {productId ? "Update the details of your product." : "Create a new product in your inventory."}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Badge variant={form.soldOut ? "destructive" : "secondary"}>
              {form.soldOut ? "Sold Out" : "In Stock"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-end justify-end sm:items-center gap-2 sm:gap-4">
          <div className='flex items-center justify-between space-x-2 w-full'>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/products')}
            className="sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
          {productId && (
            <DeleteProductDialog 
              productId={parseInt(productId, 10)}
              productName={form.name}
              onDeleteSuccess={handleDeleteSuccess}
            />
          )}
          </div>
          
          <Button
            type="submit"
            form="product-form"
            disabled={!isFormValid || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {productId ? "Update" : "Create"} Product
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Enter the basic information about your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    required
                  />
                  {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="soldOut"
                    checked={form.soldOut}
                    onCheckedChange={(checked) => handleInputChange('soldOut', checked)}
                  />
                  <Label htmlFor="soldOut">Mark as Sold Out</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>Set the pricing details for your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPricePerUnit">Discount Price Per Unit (£)</Label>
                  <Input
                    id="discountPricePerUnit"
                    type="number"
                    step="0.01"
                    value={form.discountPricePerUnit}
                    onChange={(e) => handleInputChange('discountPricePerUnit', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxCap">Maximum Order Quantity</Label>
                  <Input
                    id="maxCap"
                    type="number"
                    value={form.maxCap}
                    onChange={(e) => handleInputChange('maxCap', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
                <CardDescription>Configure shipping options for your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="baseShippingCost">Base Shipping Cost (£)</Label>
                  <Input
                    id="baseShippingCost"
                    type="number"
                    step="0.01"
                    value={form.baseShippingCost}
                    onChange={(e) => handleInputChange('baseShippingCost', e.target.value)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="bulkThreshold">Bulk Order Threshold</Label>
                  <Input
                    id="bulkThreshold"
                    type="number"
                    value={form.bulkThreshold}
                    onChange={(e) => handleInputChange('bulkThreshold', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bulkShippingCost">Bulk Shipping Cost (£)</Label>
                  <Input
                    id="bulkShippingCost"
                    type="number"
                    step="0.01"
                    value={form.bulkShippingCost}
                    onChange={(e) => handleInputChange('bulkShippingCost', e.target.value)}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="palletThreshold">Pallet Threshold</Label>
                  <Input
                    id="palletThreshold"
                    type="number"
                    value={form.palletThreshold}
                    onChange={(e) => handleInputChange('palletThreshold', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="palletShippingCost">Pallet Shipping Cost (£)</Label>
                  <Input
                    id="palletShippingCost"
                    type="number"
                    step="0.01"
                    value={form.palletShippingCost}
                    onChange={(e) => handleInputChange('palletShippingCost', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantityPerBox">Quantity Per Box</Label>
                  <Input
                    id="quantityPerBox"
                    type="number"
                    value={form.quantityPerBox}
                    onChange={(e) => handleInputChange('quantityPerBox', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Upload or update the product image.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg border">
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                    <Image
                      alt="Product image"
                      src={imagePreview || "/image-placeholder2.jpg"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
