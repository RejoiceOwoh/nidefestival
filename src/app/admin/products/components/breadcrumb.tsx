import Link from 'next/link';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb'; // Adjust the import paths if necessary
import React, { useEffect, useState } from 'react';

type BreadcrumbProps = {
  current: string;
};

export default function BreadcrumbComponent({ current }: BreadcrumbProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Set the component as mounted when running on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Products', href: '/admin/products' },
  ];

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {isMounted ? (
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <span>{item.label}</span>
            )}

            {/* Render the separator inside the BreadcrumbItem */}
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2">/</span> // Render separator inline
            )}
          </BreadcrumbItem>
        ))}

        <BreadcrumbItem>
          <span className="mx-2">/</span>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
