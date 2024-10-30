"use client"

import { useEffect, useState, useCallback } from "react";
import { DashboardSummaryCard } from "@/app/admin/components/DashboardSummaryCard";
import { SummaryCard } from "@/app/admin/components/SummaryCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardCard() {

    const [weeklyData, setWeeklyData] = useState<{ total: number; percentageChange: number } | null>(null);
    const [monthlyData, setMonthlyData] = useState<{ total: number; percentageChange: number } | null>(null);


    const [isLoading, setIsLoading] = useState(true);


    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [customerData, setCustomerData] = useState<{ totalCustomersThisMonth: number; percentageChange: number } | null>(null);
    const [productStats, setProductStats] = useState<{ totalProducts: number; newProducts: number; percentageChange: number } | null>(null);

    const fetchDashboardData = useCallback(async () => {
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
            fetchTotalProducts(),
            fetchCustomerData()
        ]);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);


    return (
        <div>
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
                            amount={weeklyData ? `£${weeklyData.total.toFixed(2)}` : "£0.00"}
                            percentageChange={weeklyData ? weeklyData.percentageChange : 0}
                            comparisonPeriod="week"
                            className="x-chunk='dashboard-05-chunk-1'"
                        />
                        <SummaryCard
                            title="This Month"
                            amount={monthlyData ? `£${monthlyData.total.toFixed(2)}` : "£0.00"}
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
        </div>
    )
}