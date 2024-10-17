import Stripe from "stripe";
import { NextResponse } from "next/server";
import { CartItem } from "@/lib/useCart";
import { calculateItemPrice, calculateShipping } from "@/lib/cartUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type ShippingOption = {
  shipping_rate_data: {
    type: 'fixed_amount';
    fixed_amount: { amount: number; currency: string };
    display_name: string;
  };
};

export async function POST(request: Request) {
  try {
    const { items, currency = "gbp" } = await request.json() as { 
      items: CartItem[], 
      currency: string
    };

    // Define available payment methods based on currency
    const paymentMethods = ["card", "alipay", "paypal"];
    if (currency.toLowerCase() === "eur") {
      paymentMethods.push("sofort", "giropay", "ideal", "bancontact", "sepa_debit");
    }

    let totalDiscount = 0;

    const lineItems = items.map((item: CartItem) => {
      const totalItemPrice = calculateItemPrice(item);
      const originalTotalPrice = item.product.price * item.quantity;
      const discountAmount = originalTotalPrice - totalItemPrice;
      totalDiscount += discountAmount;

      const unitPrice = item.product.price; // Original unit price
      const discountedUnitPrice = totalItemPrice / item.quantity;

      let description = item.product.description || '';
      if (discountAmount > 0) {
        description += `\nOriginal price: ${unitPrice.toFixed(2)} ${currency.toUpperCase()}`;
        description += `\nDiscounted price: ${discountedUnitPrice.toFixed(2)} ${currency.toUpperCase()}`;
        description += `\nDiscount applied: ${(unitPrice - discountedUnitPrice).toFixed(2)} ${currency.toUpperCase()} per unit`;
      }

      const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
        name: item.product.name,
        images: [item.product.imageUrl],
      };

      if (description.trim() !== '') {
        productData.description = description.trim();
      }

      return {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: productData,
          unit_amount: Math.round(discountedUnitPrice * 100), // Discounted price in cents
        },
        quantity: item.quantity,
      };
    });

    // Calculate shipping costs and create a breakdown
    let totalShippingCost = 0;
    const shippingBreakdown = items.map(item => {
      let shippingCost = calculateShipping(item);
      if (shippingCost === null || isNaN(shippingCost) || shippingCost <= 0) {
        // console.log(`Free shipping for item: ${item.product.name}`);
        shippingCost = 0;
        return `${item.product.name}: Free`;
      }
      totalShippingCost += shippingCost;
      return `${item.product.name}: ${shippingCost.toFixed(2)} ${currency.toUpperCase()}`;
    });

    const shippingDisplayName = totalShippingCost > 0
      ? `Shipping: ${totalShippingCost.toFixed(2)} ${currency.toUpperCase()} (${shippingBreakdown.join('; ')})`
      : 'Shipping: Free';

    const shippingOption: ShippingOption = {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: Math.round(totalShippingCost * 100),
          currency: currency.toLowerCase(),
        },
        display_name: shippingDisplayName.slice(0, 140), // Stripe limits to 140 characters
      },
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethods as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/products`,
      shipping_address_collection: { allowed_countries: ["GB", "US", "CA", "AU", "NZ", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "JP", "SG", "HK"] },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      locale: "auto",
      automatic_tax: { enabled: false },
      metadata: {
        order_id: `ORDER-${Date.now()}`,
        shipping_breakdown: shippingBreakdown.join(', '),
        total_discount: totalDiscount.toFixed(2)
      },
      shipping_options: [shippingOption],
      currency: currency.toLowerCase(),
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: unknown) {
    console.error('Stripe session creation error:', err);
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ statusCode: err.statusCode, message: err.message }, { status: err.statusCode });
    } else if (err instanceof Error) {
      return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ statusCode: 500, message: "An unknown error occurred" }, { status: 500 });
    }
  }
}
