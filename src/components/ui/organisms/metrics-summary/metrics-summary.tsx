"use client";

import * as React from "react";
import { MetricCard } from "@/components/ui/molecules/metric-card";
import { Badge } from "@/components/ui/atoms/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/atoms/card";
import type { ReviewMetricSummaryResponseDto } from "@/lib/api/dto/review-metric";
import {
  FileText,
  Coins,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export interface MetricsSummaryProps {
  summary: ReviewMetricSummaryResponseDto | null;
  isLoading: boolean;
}

export function MetricsSummary({ summary, isLoading }: MetricsSummaryProps) {
  const successRate =
    summary && summary.totalReviews > 0
      ? ((summary.successCount / summary.totalReviews) * 100).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Reviews"
          value={summary?.totalReviews ?? 0}
          icon={<FileText className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Tokens Used"
          value={summary?.totalTokens?.toLocaleString("en-US") ?? 0}
          icon={<Coins className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Estimated Cost"
          value={`$${summary?.totalCost?.toFixed(4) ?? "0.0000"}`}
          icon={<DollarSign className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Average Latency"
          value={`${summary?.averageLatencyMs?.toFixed(0) ?? 0} ms`}
          icon={<Clock className="h-5 w-5" />}
          isLoading={isLoading}
        />
        <MetricCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={<CheckCircle className="h-5 w-5" />}
          description={
            summary
              ? `${summary.successCount} successful / ${summary.errorCount} errors`
              : undefined
          }
          isLoading={isLoading}
        />
        <MetricCard
          title="Errors"
          value={summary?.errorCount ?? 0}
          icon={<XCircle className="h-5 w-5" />}
          isLoading={isLoading}
        />
      </div>

      {summary?.sentimentBreakdown && (
        <Card variant="outlined">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-font-secondary">
              Sentiment Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentBar breakdown={summary.sentimentBreakdown} />
            <div className="mt-3 flex gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="success" style="subtle" size="small">
                  Positive: {summary.sentimentBreakdown.positive}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="warning" style="subtle" size="small">
                  Neutral: {summary.sentimentBreakdown.neutral}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="error" style="subtle" size="small">
                  Negative: {summary.sentimentBreakdown.negative}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SentimentBar({
  breakdown,
}: {
  breakdown: { positive: number; neutral: number; negative: number };
}) {
  const total = breakdown.positive + breakdown.neutral + breakdown.negative;
  if (total === 0) {
    return (
      <div className="h-4 w-full rounded-full bg-bg-tertiary" />
    );
  }

  const posPercent = (breakdown.positive / total) * 100;
  const neuPercent = (breakdown.neutral / total) * 100;
  const negPercent = (breakdown.negative / total) * 100;

  return (
    <div className="flex h-4 w-full overflow-hidden rounded-full">
      {posPercent > 0 && (
        <div
          className="bg-success-60 transition-all"
          style={{ width: `${posPercent}%` }}
        />
      )}
      {neuPercent > 0 && (
        <div
          className="bg-warning-60 transition-all"
          style={{ width: `${neuPercent}%` }}
        />
      )}
      {negPercent > 0 && (
        <div
          className="bg-error-60 transition-all"
          style={{ width: `${negPercent}%` }}
        />
      )}
    </div>
  );
}
