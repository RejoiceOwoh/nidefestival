import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';

export function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SheetTrigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function SheetContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function SheetFooter({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-t">{children}</div>;
}

export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <Dialog.Title className="text-lg font-bold">{children}</Dialog.Title>;
}

export function SheetDescription({ children }: { children: React.ReactNode }) {
  return <Dialog.Description className="text-sm text-gray-500">{children}</Dialog.Description>;
}

export function SheetClose({ children }: { children: React.ReactNode }) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}
