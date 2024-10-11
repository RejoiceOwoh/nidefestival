'use client'; // Ensure this component runs on the client-side

import { useRouter } from 'next/navigation'; // For handling navigation
import { Button } from '@/components/ui/button'; // Assuming Button component from your UI library

export default function DiscardButton() {
  const router = useRouter();

  const handleDiscard = () => {
    // Navigate back to the previous page or specify a fallback route
    router.back();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDiscard}>
      Discard
    </Button>
  );
}



// import DiscardButton from './components/DiscardButton';

// export default function ProductForm() {
//   return (
//     <div>
//       {/* Other form elements here */}
//       <DiscardButton />
//     </div>
//   );
// }
