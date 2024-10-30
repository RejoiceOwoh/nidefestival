"use client"

import dynamic from 'next/dynamic';
import Fallback from './components/Fallback';

// Dynamically import PolicyPage with SSR disabled to avoid server-side errors
const PolicyPage = dynamic(() => import('./components/PolicyPage'), { ssr: false, loading: () => <Fallback /> });

export default function Page() {
  return <PolicyPage />;
}
