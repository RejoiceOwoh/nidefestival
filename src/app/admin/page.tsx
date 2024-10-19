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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DashboardSummaryCard } from "./components/DashboardSummaryCard";
import { SummaryCard } from "./components/SummaryCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ListFilter, File } from "lucide-react";

export default function Admin() {
  const [weeklyData, setWeeklyData] = useState<{ total: number; percentageChange: number } | null>(null);
  const [monthlyData, setMonthlyData] = useState<{ total: number; percentageChange: number } | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const response = await fetch("/api/weekly-transactions");
      if (!response.ok) {
        console.error("Error fetching weekly data:", await response.text());
        return;
      }
      const data = await response.json();
      setWeeklyData({
        total: data.currentWeekTotal / 100,
        percentageChange: data.percentageChange,
      });
    };

    const fetchMonthlyData = async () => {
      const response = await fetch("/api/monthly-transactions");
      if (!response.ok) {
        console.error("Error fetching monthly data:", await response.text());
        return;
      }
      const data = await response.json();
      setMonthlyData({
        total: data.currentMonthTotal / 100,
        percentageChange: data.percentageChange,
      });
    };

    const fetchRecentOrders = async () => {
      const response = await fetch("/api/recent-orders");
      if (!response.ok) {
        console.error("Error fetching recent orders:", await response.text());
        return;
      }
      const data = await response.json();
      setRecentOrders(data.orders);
    };

    fetchWeeklyData();
    fetchMonthlyData();
    fetchRecentOrders();
  }, []);

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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
          className="x-chunk='dashboard-05-chunk-2'"
        />
      </div>

      <Tabs defaultValue="week">
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
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Declined
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Refunded
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-sm"
            >
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Recent orders from your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.slice(0, 7).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {order.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{order.type}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={order.status === "Fulfilled" ? "secondary" : "outline"}>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Link href="/admin/orders">
                <Button>See More</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
