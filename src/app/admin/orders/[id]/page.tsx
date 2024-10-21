"use client"

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZoomIn, ZoomOut } from "lucide-react"; // Import icons

interface LineItem {
  id: string;
  amount: number;
  currency: string;
  description: string;
  quantity?: number;
}

interface OrderData {
  charge: any;
  lineItems: LineItem[];
}

const SMALL_SCREEN_BREAKPOINT = 600; // Adjust this value as needed

export default function OrderDetail() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [receiptHtml, setReceiptHtml] = useState<string | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching order with ID:', id);
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        console.log('Received data:', data);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        toast.error("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const resendReceipt = async () => {
    try {
      const response = await fetch(`/api/orders/${id}/resend-receipt`, { method: 'POST' });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      toast.success("Receipt resent successfully");
    } catch (error) {
      console.error("Error resending receipt:", error);
      toast.error("Failed to resend receipt");
    }
  };

  const viewReceipt = async () => {
    if (!orderData) return;

    try {
      const response = await fetch(`/api/orders/${id}/receipt`);
      if (!response.ok) {
        throw new Error('Failed to fetch receipt');
      }
      const data = await response.json();
      setReceiptHtml(data.receiptHtml);
      setIsReceiptOpen(true);
      // Reset zoom level when opening receipt
      setZoomLevel(1);
    } catch (error) {
      console.error('Error fetching receipt:', error);
      toast.error('Failed to load receipt');
    }
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  useEffect(() => {
    if (isReceiptOpen && receiptRef.current) {
      const fitContentToDialog = () => {
        const dialogContent = receiptRef.current?.parentElement;
        if (dialogContent) {
          const contentWidth = receiptRef.current.scrollWidth;
          const contentHeight = receiptRef.current.scrollHeight;
          const dialogWidth = dialogContent.clientWidth;
          const dialogHeight = dialogContent.clientHeight;

          if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) {
            const widthRatio = dialogWidth / contentWidth;
            const heightRatio = dialogHeight / contentHeight;
            const fitRatio = Math.min(widthRatio, heightRatio, 1);
            setZoomLevel(fitRatio);
          } else {
            setZoomLevel(1); // Reset to full size on larger screens
          }
        }
      };

      fitContentToDialog();
      window.addEventListener('resize', fitContentToDialog);

      return () => window.removeEventListener('resize', fitContentToDialog);
    }
  }, [isReceiptOpen, receiptHtml]);

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderData) {
    return <div>No order data available. Please check the console for more information.</div>;
  }

  const { charge, lineItems } = orderData;

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Customer Information</h3>
              <p>Name: {charge.billing_details.name}</p>
              <p>Email: {charge.billing_details.email}</p>
              <p>Phone: {charge.customer.phone || 'Not provided'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Billing Address</h3>
              <p>{charge.billing_details.address.line1}</p>
              {charge.billing_details.address.line2 && <p>{charge.billing_details.address.line2}</p>}
              <p>{charge.billing_details.address.city}, {charge.billing_details.address.state}</p>
              <p>{charge.billing_details.address.postal_code}</p>
              <p>{charge.billing_details.address.country}</p>
            </div>
            <div>
              <h3 className="font-semibold">Shipping Information</h3>
              <p>Name: {charge.shipping.name}</p>
              <p>{charge.shipping.address.line1}</p>
              {charge.shipping.address.line2 && <p>{charge.shipping.address.line2}</p>}
              <p>{charge.shipping.address.city}, {charge.shipping.address.state}</p>
              <p>{charge.shipping.address.postal_code}</p>
              <p>{charge.shipping.address.country}</p>
            </div>
            <div>
              <h3 className="font-semibold">Order Information</h3>
              <p>Status: {charge.status}</p>
              <p>Date: {new Date(charge.created * 1000).toLocaleString()}</p>
              <p>Amount: {(charge.amount / 100).toFixed(2)} {charge.currency.toUpperCase()}</p>
              <p>Receipt Number: {charge.receipt_number}</p>
            </div>
            <div>
              <h3 className="font-semibold">Payment Details</h3>
              <p>Method: {charge.payment_method_details.type}</p>
              {charge.payment_method_details.card && (
                <>
                  <p>Card Type: {charge.payment_method_details.card.brand}</p>
                  <p>Last 4 digits: {charge.payment_method_details.card.last4}</p>
                  <p>Expiry: {charge.payment_method_details.card.exp_month}/{charge.payment_method_details.card.exp_year}</p>
                  <p>Country: {charge.payment_method_details.card.country}</p>
                  <p>Funding: {charge.payment_method_details.card.funding}</p>
                </>
              )}
              {charge.payment_method_details.type !== 'card' && (
                <p>Additional details not available for this payment method</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Additional Information</h3>
              <p>Risk Level: {charge.outcome.risk_level}</p>
              <p>Seller Message: {charge.outcome.seller_message}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">Products Ordered</h3>
            {lineItems.length > 0 ? (
              <ul>
                {lineItems.map((item) => (
                  <li key={item.id}>
                    {item.description} - Quantity: {item.quantity || 1},
                    Price: {(item.amount / 100).toFixed(2)} {item.currency.toUpperCase()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Please view the receipt for detailed product information.</p>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Order Receipt</h3>
            <p>Click the button below to view the full receipt.</p>
            <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
              <DialogTrigger asChild>
                <Button onClick={viewReceipt} className="mt-2">View Receipt</Button>
              </DialogTrigger>
              <DialogContent className="w-11/12 max-w-5xl h-[90vh] p-0">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="text-center text-primary">Order Receipt</DialogTitle>
                  <DialogDescription className="text-center">
                    View and zoom the receipt for this order. Use the zoom buttons to adjust the size.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative overflow-auto h-full p-6 pt-2 z-10 flex justify-center items-start">
                  <div className="fixed bottom-2 right-2 flex space-x-2 bg-primary/80 backdrop-blur-sm p-1 rounded-md shadow-md z-20">
                    <Button
                      onClick={zoomOut}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={zoomIn}
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                  {receiptHtml ? (
                    <div
                      ref={receiptRef}
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.2s ease-out'
                      }}
                      dangerouslySetInnerHTML={{ __html: receiptHtml }}
                      className="receipt-content inline-block"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 space-x-2">
            <Button onClick={resendReceipt}>Resend Receipt</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
