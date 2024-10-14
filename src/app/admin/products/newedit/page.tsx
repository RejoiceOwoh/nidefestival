"use client"

import { useState, useEffect } from 'react';

import Image from "next/image"
import {
  Upload,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AdminNav } from "../../components/main-nav"

import { useRouter, useSearchParams } from 'next/navigation'; // Add useSearchParams
import BreadcrumbComponent from '../components/breadcrumb';
import { UserButton } from '@clerk/nextjs';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import ProductTitle from '../components/ProductTitle';
import StockBadge from '../components/StockBadge';
import DiscardButton from '../../components/DiscardButton';
import SaveButton from '../../components/SaveButton';
import MobileAdminNav from '../../components/MobileAdminNav';




export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images."

export default function NewEdit() {
  // State for form data
  const [form, setForm] = useState<{
    name: string;
    description: string;
    price: string | number;
    stock: string | number;
    imageUrl: string;
    soldOut: boolean;
    bulkThreshold: string | number;
    bulkShippingCost: string | number;
    palletThreshold: string | number;
    palletShippingCost: string | number;
    baseShippingCost: string | number;
    discountPricePerUnit: string | number;
    maxCap: string | number;
    quantityPerBox: string | number;
  }>({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    soldOut: false,
    bulkThreshold: 0,
    bulkShippingCost: 0,
    palletThreshold: 0,
    palletShippingCost: 0,
    baseShippingCost: 0,
    discountPricePerUnit: 0,
    maxCap: 0,
    quantityPerBox: 0,
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // State for form errors and validity
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);


  // Router and search params for product ID (edit mode)
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || undefined; // Product ID if in edit mode

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Add your search logic here
  };


  // Cloudinary file upload handler
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
        setForm((prev) => ({ ...prev, imageUrl: data.secure_url }));
        setImagePreview(data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  // Fetch product details if editing an existing product
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          const data = await response.json();
          setForm({
            ...form,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
            soldOut: data.soldOut,
            bulkThreshold: data.bulkThreshold || 0,
            bulkShippingCost: data.bulkShippingCost || 0,
            palletThreshold: data.palletThreshold || 0,
            palletShippingCost: data.palletShippingCost || 0,
            baseShippingCost: data.baseShippingCost || 0,
            discountPricePerUnit: data.discountPricePerUnit || 0,
            maxCap: data.maxCap || 0,
            quantityPerBox: data.quantityPerBox || 0,
          });
          setImagePreview(data.imageUrl);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  // Form input change handler
  const handleInputChange = (field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };

  // Form validation function
  const validateGroups = () => {
    const group1 = {
      name: form.name,
      price: form.price,
      stock: form.stock,
      baseShippingCost: form.baseShippingCost,
    };
    const group2 = {
      bulkThreshold: form.bulkThreshold,
      discountPricePerUnit: form.discountPricePerUnit,
      bulkShippingCost: form.bulkShippingCost,
    };
    const group3 = {
      palletThreshold: form.palletThreshold,
      palletShippingCost: form.palletShippingCost,
    };

    if (!form.name || !form.price || !form.stock) {
      return { valid: false, message: "Please fill all required fields." };
    }

    if (isGroupPartiallyFilled(group1)) {
      return { valid: false, message: "Please complete all fields in Product Details (Group 1)." };
    }

    if (isGroupPartiallyFilled(group2)) {
      return { valid: false, message: "Please complete all fields in Bulk Pricing & Shipping (Group 2)." };
    }

    if (isGroupPartiallyFilled(group3)) {
      return { valid: false, message: "Please complete all fields in Pallet Shipping (Group 3)." };
    }

    return { valid: true, message: "" };
  };

  // Check if group is partially filled
  const isGroupPartiallyFilled = (group: Record<string, string | number | null>) => {
    return Object.values(group).some((value) => value !== null && value !== "") &&
      !Object.values(group).every((value) => value !== null && value !== "");
  };

  // Validate form when form state changes
  useEffect(() => {
    const { valid, message } = validateGroups();
    setIsFormValid(valid);
    if (!valid) setGlobalError(message);
  }, [form]);

  // Clear global error after a timeout
  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => setGlobalError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [globalError]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Disable the button once the submission starts
    setIsSubmitting(true);

    // Validate the form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false); // Re-enable the button if there are errors
      return; // Prevent form submission if there are errors
    }

    try {
      const method = productId ? 'PUT' : 'POST'; // 'PUT' for update, 'POST' for add
      const endpoint = productId ? `/api/products/${productId}` : `/api/products`; // Ensure correct endpoint

      const body = JSON.stringify({
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        imageUrl: form.imageUrl,
        soldOut: form.soldOut,
        bulkThreshold: form.bulkThreshold,
        bulkShippingCost: form.bulkShippingCost,
        palletThreshold: form.palletThreshold,
        palletShippingCost: form.palletShippingCost,
        baseShippingCost: form.baseShippingCost,
        discountPricePerUnit: form.discountPricePerUnit,
        maxCap: form.maxCap,
        quantityPerBox: form.quantityPerBox,
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
      console.error('Error submitting form:', error); // Handle errors
    } finally {
      setIsSubmitting(false); // Re-enable the button after the process completes (in case of failure)
    }
  };


  // Form-level validation logic
  const validateForm = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = 'Product name is required';
    if (!form.price) newErrors.price = 'Price is required';
    if (!form.stock) newErrors.stock = 'Stock is required';
    return newErrors;
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileAdminNav />


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
                <SaveButton form={form} productId={productId} disabled={!isFormValid || isSubmitting} />
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
                    <CardFooter>
                      {
                        globalError && (
                          <div className="text-red-700 text-sm">
                            {globalError}
                          </div>
                        )
                      }
                    </CardFooter>
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
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          defaultValue={form.name || ""}
                          required
                          className="w-full"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                      </div>

                      {/* Description */}
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the product briefly (optional)"
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          defaultValue={form.description || ""}
                          className="min-h-32"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
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
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
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

                      <div className="grid gap-3">
                        <Label htmlFor="quantityPerBox">Quantity Per Box</Label>
                        <Input
                          id="quantityPerBox"
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9]*$"
                          placeholder="Enter quantity per box(Only if it applies)"
                          value={form.quantityPerBox || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]*$/.test(value)) {
                              setForm({ ...form, quantityPerBox: parseInt(value, 10) || 0 });
                            }
                          }}
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






              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="soldOut">Is this product sold out?</Label>
                        <Select
                          value={form.soldOut ? 'yes' : 'no'}
                          onValueChange={(value) => setForm({ ...form, soldOut: value === 'yes' })}
                        >
                          <SelectTrigger id="soldOut" aria-label="Select product status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="yes">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>



                <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                  <CardHeader>
                    <CardTitle>Product Image</CardTitle>
                    <CardDescription>
                      Upload the main image for your product. Ensure size 1:1 and less than 300kb for better user experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {/* Display the current image or placeholder if none exists */}
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={form.imageUrl || "/image-placeholder2.jpg"}
                        width="300"
                      />

                      {/* Image upload button */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                          onClick={() => document.getElementById('file-upload')?.click()} // Trigger hidden file input
                        >
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>

                        {/* Hidden file input */}
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload} // Cloudinary upload handler
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <DiscardButton />
              <SaveButton form={form} productId={productId} disabled={!isFormValid || isSubmitting} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
