import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SummaryCardProps {
  title: string;
  amount: string;
  percentageChange: number;
  comparisonPeriod: string;
  className?: string;
}

export function SummaryCard({
  title,
  amount,
  percentageChange,
  comparisonPeriod,
  className = "",
}: SummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentageChange > 0 ? `+${percentageChange.toFixed(2)}%` : `${percentageChange.toFixed(2)}%`} from last {comparisonPeriod}
        </div>
      </CardContent>
      <CardFooter>
        <Progress 
          value={Math.min(Math.max(percentageChange, 0), 100)} 
          aria-label={`${percentageChange.toFixed(2)}% increase`} 
        />
      </CardFooter>
    </Card>
  );
}
