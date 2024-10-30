"use client"

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ArrowRight, ListFilter } from "lucide-react";


export default function DashboardOrderTable() {

    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState("month");
    const [statusFilter, setStatusFilter] = useState<string[]>(["All"]);

    const fetchDashboardOrderData = useCallback(async () => {
        setIsLoading(true);

        const fetchRecentOrders = async () => {
            const response = await fetch("/api/recent-orders?timeFilter=" + timeFilter + "&statusFilter=" + statusFilter.join(','));
            if (!response.ok) {
                console.error("Error fetching recent orders:", await response.text());
                return;
            }
            const data = await response.json();
            setRecentOrders(data.orders);
        };

        await Promise.all([
            fetchRecentOrders(),
        ]);
        setIsLoading(false);
    }, [timeFilter, statusFilter]);

    useEffect(() => {
        fetchDashboardOrderData();
    }, [fetchDashboardOrderData]);

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

    return (
        <div>
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
                                        <TableHead className="table-cell">Status</TableHead>
                                        <TableHead className="hidden md:table-cell">Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="hidden sm:text-right">Actions</TableHead>
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
                                                    <Link href={`/admin/orders/${order.id}`}>
                                                        <div className="font-medium">{order.customerName}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {order.customerEmail}
                                                        </div>
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">{order.paymentMethod}</TableCell>
                                                <TableCell className="table-cell">
                                                    <Link href={`/admin/orders/${order.id}`}>
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
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                                <TableCell className="text-right"><Link href={`/admin/orders/${order.id}`}> £{order.amount.toFixed(2)} </Link></TableCell>
                                                <TableCell className="hidden sm:text-right">
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
    )
}