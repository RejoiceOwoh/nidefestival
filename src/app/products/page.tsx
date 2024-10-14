import HeroProducts from "./components/heroproducts";
import PricingTable from "./components/pricingTable";
import ProductsList from "./components/productslist";
import ProductsList2 from "./components/productslist copy";

/* eslint-disable @next/next/no-img-element */
export default function Products() {
    return (
      <div>
        <HeroProducts />
        <ProductsList />
        <PricingTable />
      </div>
    )
  }
  