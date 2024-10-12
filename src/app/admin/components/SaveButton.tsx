// SaveButton.tsx
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  form: any; // Form object to pass
  productId?: string | undefined; // Can be undefined for new products
  disabled: boolean; // To disable button when validation fails
}

export default function SaveButton({ form, productId, disabled }: SaveButtonProps) {
  const router = useRouter();

  const handleSave = async () => {
    const method = productId ? "PUT" : "POST";
    const endpoint = productId ? `/api/products/${productId}` : "/api/products";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      router.push("/admin/products"); // Redirect after success
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <Button size="sm" onClick={handleSave} disabled={disabled}>
      {productId ? "Update Product" : "Add Product"}
    </Button>
  );
}



// import SaveButton from './components/SaveButton';

// // Example usage within the product form component
// function ProductForm() {
//   // Assuming form and productId are defined in the component
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     baseShippingCost: '',
//     bulkThreshold: '',
//     discountPricePerUnit: '',
//     bulkShippingCost: '',
//     palletThreshold: '',
//     palletShippingCost: '',
//     maxCap: '',
//     soldOut: false,
//     imageUrl: '',
//   });

//   const productId = '123'; // Example productId (null for new products)

//   return (
//     <div>
//       {/* Form fields here */}
      
//       <SaveButton form={form} productId={productId} />
//     </div>
//   );
// }
