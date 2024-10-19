import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AdminNav } from './components/main-nav';
import MobileAdminNav from './components/MobileAdminNav';
import { AdminBreadcrumb } from './components/AdminBreadcrumb';
import { SearchInput } from './components/SearchInput';
import { UserButton } from '@clerk/nextjs';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'AfriGold Palm Oil admin dashboard',
    robots: 'noindex, nofollow', // Prevent indexing of admin pages
  };

  export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
      <div className="flex min-h-screen">
        <AdminNav />
        <div className="flex flex-1 flex-col sm:ml-14"> {/* Add left margin on larger screens */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <MobileAdminNav />
            <AdminBreadcrumb />
            <SearchInput className="ml-auto" />
            <UserButton />
          </header>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    );
  }