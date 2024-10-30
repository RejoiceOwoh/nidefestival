"use client";

import { useEffect, useState, useCallback } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type SalesDataType = { date: string; sales: number; profit: number };

export default function AdminLineChart() {
    const [isLoading, setIsLoading] = useState(true);
    const [salesData, setSalesData] = useState<SalesDataType[]>([]);

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/sales-data");
            if (!response.ok) throw new Error("Failed to fetch");

            const data: SalesDataType[] = await response.json();
            setSalesData(data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <div>
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
        </div>
    );
}
