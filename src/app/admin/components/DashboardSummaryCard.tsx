import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardSummaryCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function DashboardSummaryCard({
  title,
  description,
  buttonText,
  buttonLink,
  className = "",
}: DashboardSummaryCardProps) {
  return (
    <Card className={`sm:col-span-2 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={buttonLink}>
          <Button>{buttonText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
