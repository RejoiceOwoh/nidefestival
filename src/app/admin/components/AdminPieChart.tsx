"use client"

import { useEffect, useState, useCallback } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function AdminPieChart() {


    const [isLoading, setIsLoading] = useState(true);


    const [productData, setProductData] = useState<{ name: string; value: number }[]>([]);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);


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

        await Promise.all([
            fetchProductData()
        ]);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <div>
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
    )
}