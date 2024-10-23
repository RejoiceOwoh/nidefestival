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
      <div className="flex flex-1 flex-col sm:ml-14">
        <header className="sticky top-0 z-30 flex h-16 items-center bg-background border-b">
          <div className="flex items-center justify-between w-full px-4 sm:px-6">
            <div className="flex items-center">
              <MobileAdminNav />
              <div className="hidden sm:block max-w-[50vw] overflow-hidden">
                <AdminBreadcrumb />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
