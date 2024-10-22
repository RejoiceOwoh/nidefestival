"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("week");
  const [statusFilter, setStatusFilter] = useState<string[]>(["All"]);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, [currentPage, timeFilter, statusFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/orders?page=${currentPage}&timeFilter=${timeFilter}&statusFilter=${statusFilter.join(',')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="flex mt-5 min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>All Orders</CardTitle>
          <CardDescription>All orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={timeFilter} onValueChange={setTimeFilter}>
            <div className="flex items-center mb-4">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-sm">
                      <ListFilter className="h-4 w-4" />
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
          </Tabs>
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
                Array(10).fill(0).map((_, index) => (
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
                orders.map((order) => (
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
                      <Button size="sm" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                        View Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i} onClick={() => setCurrentPage(i + 1)}>
                  <Button size="icon" variant={currentPage === i + 1 ? "default" : "outline"} className="h-8 w-8">
                    {i + 1}
                  </Button>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}
