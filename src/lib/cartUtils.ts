import { Product } from "@prisma/client";

interface CartItem {
  product: Product;
  quantity: number;
}

export function calculateItemPrice(item: CartItem): number {
  const { product, quantity } = item;
  const boxQuantity = Math.floor(quantity / product.quantityPerBox!);
  const bottleQuantity = quantity % product.quantityPerBox!;

  let totalPrice = 0;

  if (boxQuantity >= product.bulkThreshold!) {
    totalPrice +=
      boxQuantity * (product.discountPricePerUnit! * product.quantityPerBox!);
  } else {
    totalPrice += boxQuantity * (product.price * product.quantityPerBox!);
  }

  totalPrice += bottleQuantity * product.price;

  return Number(totalPrice.toFixed(2));
}

export function calculateShipping(item: CartItem): number {
  const { product, quantity } = item;
  const boxQuantity = Math.ceil(quantity / product.quantityPerBox!);

  if (boxQuantity >= product.palletThreshold!) {
    return product.palletShippingCost!;
  }

  if (boxQuantity >= product.bulkThreshold!) {
    return boxQuantity * product.bulkShippingCost!;
  }

  return boxQuantity * product.baseShippingCost!;
}

export function calculateTotalPrice(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateItemPrice(item), 0);
}

export function calculateTotalShipping(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateShipping(item), 0);
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}
