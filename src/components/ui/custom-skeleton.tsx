// src/components/ui/custom-skeleton.tsx
import { cn } from "@/lib/utils";

interface CustomSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CustomSkeleton({ className, ...props }: CustomSkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
