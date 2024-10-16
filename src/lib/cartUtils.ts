import { Product } from "@prisma/client";

interface CartItem {
  product: Product;
  quantity: number;
}

export function calculateItemPrice(item: CartItem): number {
  const { product, quantity } = item;
  const quantityPerBox = product.quantityPerBox ?? 1;
  const boxQuantity = Math.floor(quantity / quantityPerBox);
  const bottleQuantity = quantity % quantityPerBox;

  let totalPrice = 0;

  if (product.bulkThreshold && boxQuantity >= product.bulkThreshold) {
    totalPrice +=
      boxQuantity * ((product.discountPricePerUnit ?? product.price) * quantityPerBox);
  } else {
    totalPrice += boxQuantity * (product.price * quantityPerBox);
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

export function formatPrice(price: number | undefined | null): string {
  if (typeof price !== 'number') {
    return '£0.00';
  }
  return `£${price.toFixed(2)}`;
}

export function calculateOriginalPrice(item: CartItem): number {
  const { product, quantity } = item;
  const quantityPerBox = product.quantityPerBox ?? 1;
  const totalPrice = quantity * product.price;
  return Number(totalPrice.toFixed(2));
}

export function calculateOriginalShipping(item: CartItem): number {
  const { product, quantity } = item;
  const boxQuantity = Math.ceil(quantity / product.quantityPerBox!);
  return boxQuantity * product.baseShippingCost!;
}
