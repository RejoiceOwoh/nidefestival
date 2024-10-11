// components/LoadingSkeleton.tsx
import React from "react";
import Skeleton from "./skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton width="100%" height="2rem" variant="text" /> {/* Title */}
      <Skeleton width="80%" height="1.5rem" variant="text" /> {/* Subtitle */}
      <Skeleton width="100%" height="300px" variant="rect" /> {/* Image */}
      <Skeleton width="100%" height="1.5rem" variant="text" /> {/* Description */}
      <Skeleton width="100%" height="1.5rem" variant="text" /> {/* Description */}
    </div>
  );
}
