"use client"

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import DashboardOrderTable from "./components/DashboardOrderTable";
import DashboardCard from "./components/DashboardCards";

export default function Admin() {


  const [isLoading, setIsLoading] = useState(true);


  const [salesData, setSalesData] = useState<any[]>([]);
  const [productData, setProductData] = useState<{ name: string; value: number }[]>([]);
  const [totalCustomers, setTotalCustomers] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);

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

    const fetchTotalCustomers = async () => {
      const response = await fetch("/api/total-customers");
      if (!response.ok) {
        console.error("Error fetching total customers:", await response.text());
        return;
      }
      const data = await response.json();
      setTotalCustomers(data.totalCustomers);
    };


    await Promise.all([
      fetchSalesData(),
      fetchProductData(),
      fetchTotalCustomers(),
    ]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  

  return (
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <DashboardCard />

          <DashboardOrderTable />
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
