// components/Skeleton.tsx
import React from "react";
import clsx from "clsx"; // Utility for handling class names (optional)

interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: "circle" | "rect" | "text"; // Define different shapes
  className?: string; // Allow custom class names for flexibility
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  variant = "text",
  className = "",
}) => {
  const skeletonClass = clsx(
    "bg-gray-300 animate-pulse", // Base styling
    variant === "circle" && "rounded-full", // Circle variant
    variant === "rect" && "rounded-md", // Rectangle variant
    variant === "text" && "rounded", // Text variant
    className // Custom className
  );

  return (
    <div
      className={skeletonClass}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Skeleton;
