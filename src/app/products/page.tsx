import HeroProducts from "./components/heroproducts";
import PricingTable from "./components/pricingTable";
import ProductsList from "./components/productslist";
import ProductsList2 from "./components/productslist copy";
import { Metadata } from 'next';

/* eslint-disable @next/next/no-img-element */
export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore our range of premium, authentic Nigerian palm oil products.',
  keywords: ['palm oil products', 'Nigerian palm oil', 'AfriGold products'],
};

export default function ProductsPage() {
  return (
    <div>
      <HeroProducts />
      <div id="productsList">
        <ProductsList />
      </div>
      {/* <PricingTable /> */}
    </div>
  )
}
