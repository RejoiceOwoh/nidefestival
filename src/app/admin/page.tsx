"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DashboardSummaryCard } from "./components/DashboardSummaryCard";
import { SummaryCard } from "./components/SummaryCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ArrowRight, ListFilter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

export default function Admin() {
  const [weeklyData, setWeeklyData] = useState<{ total: number; percentageChange: number } | null>(null);
  const [monthlyData, setMonthlyData] = useState<{ total: number; percentageChange: number } | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("week");
  const [statusFilter, setStatusFilter] = useState<string[]>(["All"]);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [productData, setProductData] = useState<{ name: string; value: number }[]>([]);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);
  const [customerData, setCustomerData] = useState<{ totalCustomersThisMonth: number; percentageChange: number } | null>(null);
  const [productStats, setProductStats] = useState<{ totalProducts: number; newProducts: number; percentageChange: number } | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch("/api/weekly-transactions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeeklyData({
          total: data.total || 0,
          percentageChange: isFinite(data.percentageChange) ? data.percentageChange : 0,
        });
      } catch (error) {
        console.error("Error fetching weekly data:", error);
        setWeeklyData({ total: 0, percentageChange: 0 });
      }
    };

    const fetchMonthlyData = async () => {
      try {
        const response = await fetch("/api/monthly-transactions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMonthlyData({
          total: data.total || 0,
          percentageChange: isFinite(data.percentageChange) ? data.percentageChange : 0,
        });
      } catch (error) {
        console.error("Error fetching monthly data:", error);
        setMonthlyData({ total: 0, percentageChange: 0 });
      }
    };

    const fetchRecentOrders = async () => {
      const response = await fetch("/api/recent-orders?timeFilter=" + timeFilter + "&statusFilter=" + statusFilter.join(','));
      if (!response.ok) {
        console.error("Error fetching recent orders:", await response.text());
        return;
      }
      const data = await response.json();
      setRecentOrders(data.orders);
    };

    const fetchSalesData = async () => {
      const response = await fetch("/api/sales-data");
      if (!response.ok) {
        console.error("Error fetching sales data:", await response.text());
        return;
      }
      const data = await response.json();
      setSalesData(data);
    };

    const fetchProductData = async () => {
      try {
        const response = await fetch("/api/product-data");
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    const fetchTotalProducts = async () => {
      const response = await fetch("/api/total-products");
      if (!response.ok) {
        console.error("Error fetching total products:", await response.text());
        return;
      }
      const data = await response.json();
      setTotalProducts(data.totalProducts);
      setProductStats({
        totalProducts: data.totalProducts,
        newProducts: data.newProducts,
        percentageChange: data.percentageChange
      });
    };

    const fetchTotalCustomers = async () => {
      const response = await fetch("/api/total-customers");
      if (!response.ok) {
        console.error("Error fetching total customers:", await response.text());
        return;
      }
      const data = await response.json();
      setTotalCustomers(data.totalCustomers);
    };

    const fetchCustomerData = async () => {
      const response = await fetch("/api/total-customers");
      if (!response.ok) {
        console.error("Error fetching customer data:", await response.text());
        return;
      }
      const data = await response.json();
      setCustomerData(data);
    };

    await Promise.all([
      fetchWeeklyData(),
      fetchMonthlyData(),
      fetchRecentOrders(),
      fetchSalesData(),
      fetchProductData(),
      fetchTotalProducts(),
      fetchTotalCustomers(),
      fetchCustomerData()
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeFilter, statusFilter]);

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(prev => {
      if (status === "All") {
        return ["All"];
      }
      const newFilter = prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev.filter(s => s !== "All"), status];
      return newFilter.length ? newFilter : ["All"];
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Add these console.log statements just before rendering the SummaryCards
  console.log('Weekly Data:', weeklyData);
  console.log('Monthly Data:', monthlyData);

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {isLoading ? (
              <>
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
                <Skeleton className="h-[180px] w-full" />
              </>
            ) : (
              <>
                <DashboardSummaryCard
                  title="Your Orders"
                  description="Introducing Our Dynamic Product Dashboard for Seamless Management and Insightful Analysis."
                  buttonText="Create New Product"
                  buttonLink="/admin/products/newedit"
                />
                <SummaryCard
                  title="This Week"
                  amount={weeklyData ? `$${weeklyData.total.toFixed(2)}` : "$0.00"}
                  percentageChange={weeklyData ? weeklyData.percentageChange : 0}
                  comparisonPeriod="week"
                  className="x-chunk='dashboard-05-chunk-1'"
                />
                <SummaryCard
                  title="This Month"
                  amount={monthlyData ? `$${monthlyData.total.toFixed(2)}` : "$0.00"}
                  percentageChange={monthlyData ? monthlyData.percentageChange : 0}
                  comparisonPeriod="month"
                />
                <SummaryCard
                  title="Total Products"
                  amount={totalProducts ? totalProducts.toString() : "0"}
                  percentageChange={productStats ? productStats.percentageChange : 0}
                  comparisonPeriod="last month"
                />
                <SummaryCard
                  title="New Customers This Month"
                  amount={customerData ? customerData.totalCustomersThisMonth.toString() : "0"}
                  percentageChange={customerData ? customerData.percentageChange : 0}
                  comparisonPeriod="last month"
                />
              </>
            )}
          </div>

          <Tabs value={timeFilter} onValueChange={setTimeFilter}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("All")}
                      onCheckedChange={() => handleStatusFilterChange("All")}
                    >
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Succeeded")}
                      onCheckedChange={() => handleStatusFilterChange("Succeeded")}
                    >
                      Succeeded
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Failed")}
                      onCheckedChange={() => handleStatusFilterChange("Failed")}
                    >
                      Failed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value={timeFilter}>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Recent orders from your store.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">Payment Method</TableHead>
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        // Loading skeletons
                        Array(7).fill(0).map((_, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Skeleton className="h-4 w-[150px]" />
                              <Skeleton className="h-3 w-[100px] mt-2" />
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Skeleton className="h-4 w-[100px]" />
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Skeleton className="h-6 w-[80px]" />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="h-4 w-[60px] ml-auto" />
                            </TableCell>
                            <TableCell className="text-right">
                              <Skeleton className="h-8 w-[80px] ml-auto" />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        // Actual data
                        recentOrders.slice(0, 7).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <div className="font-medium">{order.customerName}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.customerEmail}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{order.paymentMethod}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                className="text-xs"
                                variant={
                                  order.status === "Succeeded" ? "secondary" :
                                    order.status === "Failed" ? "destructive" :
                                      "outline"
                                }
                                style={{
                                  backgroundColor: order.status === "Succeeded" ? "green" : undefined,
                                  color: order.status === "Succeeded" ? "white" : undefined
                                }}
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                            <TableCell className="text-right">${order.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Link href={`/admin/orders/${order.id}`}>
                                <Button size="sm">View Now</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/admin/orders" passHref>
                    <Button
                      className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                      variant="outline"
                    >
                      See More Orders
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/3 mt-4 lg:mt-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px]">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--foreground))" tick={{ fontSize: 12 }} />
                    <YAxis stroke="hsl(var(--foreground))" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-1))" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px]">
              {isLoading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius="80%"
                      fill="hsl(var(--chart-1))"
                      dataKey="value"
                      // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
