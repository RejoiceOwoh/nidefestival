'use client'; // Ensure this component runs on the client-side

import { useSearchParams } from 'next/navigation'; // Next.js 13's search params hook
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react'; // Using Loader icon from lucide-react for the loader

interface ProductTitleProps {}

export default function ProductTitle() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const [productTitle, setProductTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Keep loading state initially true
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setError(null); // Reset errors before fetching
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProductTitle(data.name || ''); // Set product name or empty string
        } catch (err) {
          setError('Failed to load product');
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };
      fetchProduct();
    } else {
      setLoading(false); // If no productId, stop loading
    }
  }, [productId]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin h-5 w-5 text-muted-foreground" /> {/* Animated Loader Icon */}
        </div>
      ) : error ? (
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {error}
        </h1>
      ) : (
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {productTitle || 'New Product'}
        </h1>
      )}
    </div>
  );
}



// USAGE EXAMPLE
// import ProductTitle from './components/ProductTitle';

// export default function SomeComponent() {
//   return (
//     <div>
//       <ProductTitle />
//     </div>
//   );
// }

