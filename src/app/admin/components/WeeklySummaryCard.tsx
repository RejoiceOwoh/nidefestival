import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface WeeklySummaryCardProps {
  title: string;
  amount: string;
  percentageChange: number;
  className?: string;
}

export function WeeklySummaryCard({
  title,
  amount,
  percentageChange,
  className = "",
}: WeeklySummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentageChange > 0 ? `+${percentageChange}% from last week` : `${percentageChange}% from last week`}
        </div>
      </CardContent>
      <CardFooter>
        <Progress 
          value={Math.min(Math.max(percentageChange, 0), 100)} 
          aria-label={`${percentageChange}% increase`} 
        />
      </CardFooter>
    </Card>
  );
}

