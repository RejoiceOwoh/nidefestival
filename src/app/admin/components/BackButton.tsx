'use client'; // Ensure this component runs on the client-side

import { Button } from "@/components/ui/button"; // Adjust based on your project setup
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct hook for Next.js 13+

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Navigates to the previous page in history
  };

  return (
    <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleBack}>
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
  );
}


// import BackButton from './components/BackButton';

// export default function SomeComponent() {
//   return (
//     <div>
//       <BackButton />
//     </div>
//   );
// }
