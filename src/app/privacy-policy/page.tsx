// Import Suspense
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FallbackLoading from './components/Fallback';
import PolicyPage from './components/PolicyPage';

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <PolicyPage />
    </Suspense>
  );
}