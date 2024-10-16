import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { PanelLeft, Link, Home, ShoppingCart, Package, Users2 } from "lucide-react";
import Image from "next/image";



export default function MobileAdminNav(){
    return(
        <div>
        <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/admin"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Image
                    src="/logo.png"
                    alt="Afrigold Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                  <span className="sr-only">Acefoods</span>
                </Link>
                <Link href="/admin" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="/admin/orders" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link href="/admin/products" className="flex items-center gap-4 px-2.5 text-foreground">
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link href="/admin/customers" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
    )
}
