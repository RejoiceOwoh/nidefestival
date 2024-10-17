import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CartItem } from "@/lib/useCart";
import { calculateItemPrice, calculateShipping } from "@/lib/cartUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const { items } = await request.json() as { items: CartItem[] };

    const lineItems = items.map((item: CartItem) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.product.name,
          images: [item.product.imageUrl],
        },
        unit_amount: Math.round(calculateItemPrice(item) * 100),
      },
      quantity: 1,
    }));

    items.forEach((item: CartItem) => {
      const shippingCost = calculateShipping(item);
      if (shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Shipping for ${item.product.name}`,
              images: [],
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ statusCode: 500, message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
