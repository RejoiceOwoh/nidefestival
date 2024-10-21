"use client";

import { Key, useEffect, useState } from "react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function HeroProducts() {
  const imageUrls = [
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218461/_LUP8383_t0pxo2.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218462/_LUP8385_yy0ku0.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218459/GOLD1_iucli8.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218421/GOLD2_wozmcv.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218467/_LUP8401_nhtjxj.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218622/_LUP8379_z3nzi5.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218410/_LUP8365_k4l1z5.png",
  ];

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [imageUrls]);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Discover Our Premium Red Palm Oil Range
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Pure, unrefined palm oil, ideal for everyday cooking, rich in Vitamin A and E, promotes heart health, and perfect for creating traditional dishes.
            </p>
          </div>

          {imagesLoaded && (
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute mt-10 md:left-1/2 md:top-0 md:translate-x-12 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <ImageGrid />
                </div>
              </div>

              <div className="relative z-10 mt-5 md:mt-5 ">
                <Link
                  href="/products#productsList"
                  className="inline-block rounded-md border border-transparent bg-primary px-8 py-3 text-center font-medium text-white hover:bg-primary/80"
                >
                  View Collection
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageGrid() {
  const imageUrls = [
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218461/_LUP8383_t0pxo2.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218462/_LUP8385_yy0ku0.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218459/GOLD1_iucli8.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218421/GOLD2_wozmcv.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218467/_LUP8401_nhtjxj.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218622/_LUP8379_z3nzi5.png",
    "https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218410/_LUP8365_k4l1z5.png",
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="marquee flex">
        {imageUrls.concat(imageUrls).map((url: string | undefined, idx: Key | null | undefined) => (
          <div key={idx} className="h-64 w-44 overflow-hidden rounded-lg flex-shrink-0">
            <img alt="" src={url} className="h-full m-4 rounded-lg w-full object-cover object-center" />
          </div>
        ))}
      </div>
    </div>
  );
}
