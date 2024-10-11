'use client'; // Ensure this component runs on the client-side

import { useSearchParams } from 'next/navigation'; // For fetching productId
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge'; // Assuming Badge component from your UI library

export default function StockBadge() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const [stock, setStock] = useState<number | null>(null); // State to store the stock
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (productId) {
      const fetchStock = async () => {
        setError(null); // Reset error state before fetching
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch stock');
          }
          const data = await response.json();
          setStock(data.stock || 0); // Set stock or 0 if no stock is found
        } catch (err) {
          setError('Failed to load stock');
        } finally {
          setLoading(false); // Stop loading once the fetch is complete
        }
      };
      fetchStock();
    } else {
      setLoading(false); // If no productId, stop loading
    }
  }, [productId]);

  if (!productId) {
    return null; // Return nothing (badge is invisible) if no productId is available (new product)
  }

  if (loading) {
    return (
      <Badge variant="outline" className="ml-auto sm:ml-0">
        <div className="animate-pulse text-gray-500">
            Loading...
        </div>
      </Badge>
    );
  }

  if (error) {
    return (
      <Badge variant="outline" className="ml-auto sm:ml-0">
        {error}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="ml-auto sm:ml-0">
      {stock === 0 ? 'Out of Stock' : `Stock Left: ${stock}`}
    </Badge>
  );
}


// import StockBadge from './components/StockBadge';

// export default function ProductPage() {
//   return (
//     <div>
//       <StockBadge />
//     </div>
//   );
// }
