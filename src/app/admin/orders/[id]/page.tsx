'use client'

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ZoomIn, ZoomOut, User, MapPin, CreditCard, Package, Info, Receipt, Package2 } from "lucide-react"

interface LineItem {
  id: string
  amount: number
  currency: string
  description: string
  quantity?: number
}

interface OrderData {
  charge: any
  lineItems: LineItem[]
}

const SMALL_SCREEN_BREAKPOINT = 600

export default function EnhancedOrderDetail() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [receiptHtml, setReceiptHtml] = useState<string | null>(null)
  const receiptRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const [receiptError, setReceiptError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log('Fetching order with ID:', id)
        const response = await fetch(`/api/orders/${id}`)
        if (!response.ok) {
          throw new Error(await response.text())
        }
        const data = await response.json()
        console.log('Received data:', data)
        setOrderData(data)
      } catch (error) {
        console.error("Error fetching order details:", error)
        setError(error instanceof Error ? error.message : 'An unknown error occurred')
        toast.error("Failed to fetch order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  const resendReceipt = async () => {
    try {
      const response = await fetch(`/api/orders/${id}/resend-receipt`, { method: 'POST' })
      if (!response.ok) {
        throw new Error(await response.text())
      }
      toast.success("Receipt resent successfully")
    } catch (error) {
      console.error("Error resending receipt:", error)
      toast.error("Failed to resend receipt")
    }
  }

  const viewReceipt = async () => {
    if (!orderData) return

    setReceiptHtml(null)
    setReceiptError(null)
    setIsReceiptOpen(true)

    try {
      const response = await fetch(`/api/orders/${id}/receipt`)
      if (!response.ok) {
        throw new Error(await response.text())
      }
      const data = await response.json()
      if (data.error) {
        setReceiptError(data.error)
      } else {
        setReceiptHtml(data.receiptHtml)
      }
    } catch (error) {
      console.error('Error fetching receipt:', error)
      setReceiptError('Failed to load receipt')
    }
  }

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2))
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5))

  useEffect(() => {
    if (isReceiptOpen && receiptRef.current) {
      const fitContentToDialog = () => {
        const dialogContent = receiptRef.current?.parentElement
        if (dialogContent) {
          const contentWidth = receiptRef.current.scrollWidth
          const contentHeight = receiptRef.current.scrollHeight
          const dialogWidth = dialogContent.clientWidth
          const dialogHeight = dialogContent.clientHeight

          if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) {
            const widthRatio = dialogWidth / contentWidth
            const heightRatio = dialogHeight / contentHeight
            const fitRatio = Math.min(widthRatio, heightRatio, 1)
            setZoomLevel(fitRatio)
          } else {
            setZoomLevel(1)
          }
        }
      }

      fitContentToDialog()
      window.addEventListener('resize', fitContentToDialog)

      return () => window.removeEventListener('resize', fitContentToDialog)
    }
  }, [isReceiptOpen, receiptHtml])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-[300px] text-red-500"
      >
        Error: {error}
      </motion.div>
    )
  }

  if (!orderData || !orderData.charge) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-[300px] text-muted-foreground"
      >
        No order data available. Please check the console for more information.
      </motion.div>
    )
  }

  const { charge, lineItems } = orderData

  const InfoCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary/10 p-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-primary mb-6">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard title="Customer Information" icon={<User className="w-5 h-5" />}>
          <p><span className="font-semibold">Name:</span> {charge.billing_details?.name || 'Not provided'}</p>
          <p><span className="font-semibold">Email:</span> {charge.billing_details?.email || 'Not provided'}</p>
          <p><span className="font-semibold">Phone:</span> {charge.customer?.phone || 'Not provided'}</p>
        </InfoCard>

        <InfoCard title="Billing Address" icon={<MapPin className="w-5 h-5" />}>
          <p>{charge.billing_details?.address?.line1 || 'Not provided'}</p>
          {charge.billing_details?.address?.line2 && <p>{charge.billing_details.address.line2}</p>}
          <p>{charge.billing_details?.address?.city || 'Not provided'}, {charge.billing_details?.address?.state || 'Not provided'}</p>
          <p>{charge.billing_details?.address?.postal_code || 'Not provided'}</p>
          <p>{charge.billing_details?.address?.country || 'Not provided'}</p>
        </InfoCard>

        <InfoCard title="Shipping Information" icon={<Package className="w-5 h-5" />}>
          <p><span className="font-semibold">Name:</span> {charge.shipping?.name || 'Not provided'}</p>
          <p>{charge.shipping?.address?.line1 || 'Not provided'}</p>
          {charge.shipping?.address?.line2 && <p>{charge.shipping.address.line2}</p>}
          <p>{charge.shipping?.address?.city || 'Not provided'}, {charge.shipping?.address?.state || 'Not provided'}</p>
          <p>{charge.shipping?.address?.postal_code || 'Not provided'}</p>
          <p>{charge.shipping?.address?.country || 'Not provided'}</p>
        </InfoCard>

        <InfoCard title="Order Information" icon={<Info className="w-5 h-5" />}>
          <p><span className="font-semibold">Status:</span> {charge.status || 'Unknown'}</p>
          <p><span className="font-semibold">Date:</span> {charge.created ? new Date(charge.created * 1000).toLocaleString() : 'Unknown'}</p>
          <p><span className="font-semibold">Amount:</span> {charge.amount ? `£${(charge.amount / 100).toFixed(2)}` : 'Unknown'}</p>
          <p><span className="font-semibold">Receipt Number:</span> {charge.receipt_number || 'Not available'}</p>
        </InfoCard>

        <InfoCard title="Payment Details" icon={<CreditCard className="w-5 h-5" />}>
          <p><span className="font-semibold">Method:</span> {charge.payment_method_details?.type || 'Unknown'}</p>
          {charge.payment_method_details?.card && (
            <>
              <p><span className="font-semibold">Card Type:</span> {charge.payment_method_details.card.brand || 'Unknown'}</p>
              <p><span className="font-semibold">Last 4 digits:</span> {charge.payment_method_details.card.last4 || 'Unknown'}</p>
              <p><span className="font-semibold">Expiry:</span> {charge.payment_method_details.card.exp_month || 'XX'}/{charge.payment_method_details.card.exp_year || 'XXXX'}</p>
              <p><span className="font-semibold">Country:</span> {charge.payment_method_details.card.country || 'Unknown'}</p>
              <p><span className="font-semibold">Funding:</span> {charge.payment_method_details.card.funding || 'Unknown'}</p>
            </>
          )}
          {charge.payment_method_details?.type !== 'card' && (
            <p>Additional details not available for this payment method</p>
          )}
        </InfoCard>

        <InfoCard title="Additional Information" icon={<Info className="w-5 h-5" />}>
          <p><span className="font-semibold">Risk Level:</span> {charge.outcome?.risk_level || 'Unknown'}</p>
          <p><span className="font-semibold">Seller Message:</span> {charge.outcome?.seller_message || 'Not available'}</p>
        </InfoCard>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package2 className="w-5 h-5" />
            Products Ordered
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lineItems && lineItems.length > 0 ? (
            <ul className="space-y-2">
              {lineItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted p-3 rounded-md"
                >
                  <span className="font-semibold">{item.description || 'Unknown product'}</span>
                  <span className="ml-2">- Quantity: {item.quantity || 1},</span>
                  <span className="ml-2">Price: {item.amount ? `£${(item.amount / 100).toFixed(2)}` : 'Unknown'}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>Please view the receipt for detailed product information.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Order Receipt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to view the full receipt.</p>
          <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
            <DialogTrigger asChild>
              <Button onClick={viewReceipt} className="mr-2">View Receipt</Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 max-w-5xl h-[90vh] p-0">
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-center text-primary">Order Receipt</DialogTitle>
                <DialogDescription className="text-center">
                  View and zoom the receipt for this order. Use the zoom buttons to adjust the size.
                </DialogDescription>
              </DialogHeader>
              <div className="relative overflow-auto h-full p-6 pt-2 z-10 flex justify-center items-center">
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
                <AnimatePresence>
                  {!receiptHtml && !receiptError ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
                    ></motion.div>
                  ) : receiptError ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center p-4"
                    >
                      <p className="text-red-500 mb-2">{receiptError}</p>
                      <p>The receipt is not available here, but it can be accessed from the Stripe dashboard.</p>
                      <p>Please check the Stripe dashboard for more details on this order.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      ref={receiptRef}
                      style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.2s ease-out'
                      }}
                      dangerouslySetInnerHTML={{ __html: receiptHtml ?? '' }}
                      className="receipt-content inline-block"
                    />
                  )}
                </AnimatePresence>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={resendReceipt} variant="outline">Resend Receipt</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
