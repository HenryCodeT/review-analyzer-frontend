import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/atoms/card";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  isLoading?: boolean;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  isLoading = false,
  className,
}: MetricCardProps) {
  return (
    <Card variant="outlined" className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-font-tertiary">
            {title}
          </CardTitle>
          {icon && (
            <span className="text-font-tertiary">{icon}</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton width="60%" height={32} />
        ) : (
          <>
            <p className="text-2xl font-bold text-font-primary">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-font-tertiary">{description}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
