// components/PricingTable.tsx

import { PackageIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PricingTable: React.FC = () => {
  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className='t text-2xl font-bold text-center mb-5'>Our Pricing</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-center md:gap-8">


        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              1 - 11 Bottles
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> £10.99 </strong>

              <span className="text-sm font-medium text-gray-700">/per bottle</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-5">
              <ShoppingCart className="size-5" />

              <span className="text-gray-700"> £8.75 Delivery Fee </span>
            </li>

            <li className="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> 2 Litre Bottle </span>
            </li>

          </ul>

        </div>

        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              1 - 5 Boxes
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> £48 </strong>

              <span className="text-sm font-medium text-gray-700">/per box</span>
            </p>
          </div>
          <ul>
            <li className="flex items-center gap-5">
              <ShoppingCart className="size-5" />

              <span className="text-gray-700"> £8.75 Delivery Fee /Per Box </span>
            </li>

            <li className="flex items-center gap-5">
              <PackageIcon className="size-5" />

              <span className="text-gray-700"> 6 Bottles Per Box </span>
            </li>

            <li className="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> 2 Litre Bottle </span>
            </li>
          </ul>



        </div>

        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              10 - 100 Boxes
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> £42 </strong>

              <span className="text-sm font-medium text-gray-700">/per box</span>
            </p>
          </div>

          <ul>
            <li className="flex items-center gap-5">
              <ShoppingCart className="size-5" />

              <span className="text-gray-700"> £7.00 Delivery Fee /Per Box </span>
            </li>

            <li className="flex items-center gap-5">
              <PackageIcon className="size-5" />

              <span className="text-gray-700"> 6 Bottles Per Box </span>
            </li>
            
            <li className="flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> 2 Litre Bottle </span>
            </li>
          </ul>

        </div>
        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Need More?
            </h2>

            {/* <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> £42 </strong>

              <span className="text-sm font-medium text-gray-700">/per box</span>
            </p> */}
          </div>

          {/* <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> 10 users included </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> 2GB of storage </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-indigo-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>

              <span className="text-gray-700"> Help center access </span>
            </li>
          </ul> */}

          <Link
            href="https://wa.me/+447526066245"
            className="mt-8 block rounded-full border border-black bg-white px-12 py-3 text-center font-semibold text-black transition-all duration-300 ease-in-out hover:ring-1 hover:bg-black hover:text-white hover:border-none focus:outline-none focus:ring active:text-black"
          >
            Contact Us
          </Link>


        </div>


      </div>
    </div>
  );
};

export default PricingTable;
