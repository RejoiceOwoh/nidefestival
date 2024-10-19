"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderDetails() {
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetails = async () => {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        console.error("Error fetching order details:", await response.text());
        return;
      }
      const data = await response.json();
      setOrder(data.order);
    };

    fetchOrderDetails();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Order Details</CardTitle>
          <CardDescription>Details for order {order.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="font-semibold">Customer Information</div>
            <div>Name: {order.customerName}</div>
            <div>Email: {order.customerEmail}</div>
            <div>Phone: {order.customerPhone}</div>
            <div className="font-semibold mt-4">Order Information</div>
            <div>Type: {order.type}</div>
            <div>Status: {order.status}</div>
            <div>Date: {order.date}</div>
            <div>Amount: ${order.amount.toFixed(2)}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => resendReceipt(order.id)}>Resend Receipt</Button>
        </CardFooter>
      </Card>
    </div>
  );

  async function resendReceipt(orderId: string) {
    const response = await fetch(`/api/orders/${orderId}/resend-receipt`, {
      method: "POST",
    });
    if (response.ok) {
      alert("Receipt resent successfully!");
    } else {
      alert("Failed to resend receipt.");
    }
  }
}
