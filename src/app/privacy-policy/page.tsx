'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Shield, Truck, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define a type for the expandedSections state
type ExpandedSections = {
  [key: string]: boolean;
};

const policies = [
  {
    title: "Privacy Policy",
    icon: Shield,
    content: [
      {
        title: "Information We Collect",
        description: "We collect personal data when you purchase products, sign up for newsletters, contact us, or provide feedback. This may include your name, address, email, phone number, payment details, and order history."
      },
      {
        title: "How We Use Your Information",
        description: "We use your information for order processing, customer support, marketing (if you opt-in), and to improve our services through data analysis."
      },
      {
        title: "How We Protect Your Information",
        description: "We implement physical and digital security measures including encrypted transactions, secure payment gateways, and firewalls. We never share your personal information with third parties unless required to complete your purchase or by law."
      },
      {
        title: "Your Rights",
        description: "You have the right to request access to your data, opt out of marketing communications, and request data deletion. Contact us at privacy@acefoods.co.uk for more details."
      }
    ]
  },
  {
    title: "Terms of Service",
    icon: FileText,
    content: [
      {
        title: "Eligibility to Use",
        description: "You must be at least 18 years old or have the legal capacity to form binding contracts to make purchases through our website."
      },
      {
        title: "Product Availability and Descriptions",
        description: "We strive to ensure accurate product descriptions and availability, but cannot guarantee all items will always be in stock. We'll inform you of unavailability and offer alternatives or refunds."
      },
      {
        title: "Pricing and Payment",
        description: "All prices are in GBP and include applicable taxes. We reserve the right to modify prices without notice. Payments are processed securely through our payment partners."
      },
      {
        title: "Order Cancellations and Modifications",
        description: "You can cancel or modify your order until dispatch. After shipping, you must follow our return process for cancellations."
      },
      {
        title: "Intellectual Property",
        description: "All content on the Acefoods website is our intellectual property and may not be used without written consent."
      },
      {
        title: "Limitation of Liability",
        description: "Acefoods is not liable for any indirect, incidental, or consequential damages arising from your use of our website or products."
      }
    ]
  },
  {
    title: "Shipping Policy",
    icon: Truck,
    content: [
      {
        title: "Processing Time",
        description: "Orders are processed within 1-2 business days after purchase. You'll receive an email notification once your order has been shipped."
      },
      {
        title: "Shipping Methods and Costs",
        description: "We offer standard and express shipping within the UK and select international locations. Costs are calculated based on location and order weight, displayed at checkout."
      },
      {
        title: "Estimated Delivery Times",
        description: "UK: Standard shipping takes 3-5 business days, express shipping 1-2 business days. International orders typically take 20-60 business days."
      },
      {
        title: "Tracking Your Order",
        description: "You'll receive a confirmation email with tracking information once your order is shipped."
      },
      {
        title: "Customs, Duties, and Taxes",
        description: "For international orders, customs fees, duties, or taxes may be imposed by local authorities and are the customer's responsibility."
      },
      {
        title: "Lost or Damaged Shipments",
        description: "Contact us immediately at shipping@acefoods.co.uk for lost or damaged orders. We'll investigate and provide a replacement or refund as needed."
      },
      {
        title: "Returns and Refunds",
        description: "You may return unopened products within 14 days of delivery for a full refund or exchange. Return shipping costs are the customer's responsibility unless the product was damaged or faulty upon receipt."
      }
    ]
  }
]

export default function PolicyPage() {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({})

  const toggleSection = (policyIndex: number, sectionIndex: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [`${policyIndex}-${sectionIndex}`]: !prev[`${policyIndex}-${sectionIndex}`]
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Acefoods Policies</h1>
        <p className="text-lg text-center mb-12">
          Effective Date: October 2024
        </p>

        <Tabs defaultValue="privacy-policy" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {policies.map((policy, index) => (
              <TabsTrigger 
                key={index} 
                value={policy.title.toLowerCase().replace(' ', '-')}
                className="flex items-center justify-center"
              >
                <policy.icon className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">{policy.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {policies.map((policy, policyIndex) => (
            <TabsContent key={policyIndex} value={policy.title.toLowerCase().replace(' ', '-')}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <policy.icon className="w-6 h-6 mr-2" />
                    {policy.title}
                  </CardTitle>
                  <CardDescription>
                    Learn about our {policy.title.toLowerCase()} at Acefoods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {policy.content.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-left font-semibold py-2 px-4"
                        onClick={() => toggleSection(policyIndex, sectionIndex)}
                      >
                        {section.title}
                        {expandedSections[`${policyIndex}-${sectionIndex}`] ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                      <AnimatePresence>
                        {expandedSections[`${policyIndex}-${sectionIndex}`] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 bg-muted rounded-md mt-2">
                              {section.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>For any questions or concerns, please contact us at support@acefoods.co.uk</p>
        </footer>
      </div>
    </div>
  )
}
