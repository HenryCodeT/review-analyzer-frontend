"use client";

import { Heading } from "@/components/ui/atoms/heading";
import { Badge } from "@/components/ui/atoms/badge";
import { Alert, AlertDescription } from "@/components/ui/atoms/alert";
import { MetricsSummary } from "@/components/ui/organisms/metrics-summary";
import { DataTable } from "@/components/ui/molecules/data-table";
import { useMetrics } from "@/hooks/use-metrics";
import type { ReviewMetricItemDto } from "@/lib/api/dto/review-metric";
import type { DataTableColumn } from "@/components/ui/molecules/data-table";

const columns: DataTableColumn<ReviewMetricItemDto>[] = [
  {
    key: "reviewId",
    header: "Review ID",
    render: (item) => (
      <span className="font-mono text-xs text-font-tertiary">
        {item.reviewId.slice(0, 8)}...
      </span>
    ),
  },
  {
    key: "tokens",
    header: "Tokens",
    render: (item) => (
      <span className="text-font-primary">
        {item.totalTokens.toLocaleString("en-US")}
        <span className="ml-1 text-xs text-font-tertiary">
          ({item.inputTokens}↑ {item.outputTokens}↓)
        </span>
      </span>
    ),
  },
  {
    key: "cost",
    header: "Cost",
    render: (item) => (
      <span className="text-font-primary">
        ${item.estimatedCost.toFixed(4)}
      </span>
    ),
  },
  {
    key: "latency",
    header: "Latency",
    render: (item) => (
      <span className="text-font-primary">{item.latencyMs} ms</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <Badge
        variant={item.status === "success" ? "success" : "error"}
        style="subtle"
        size="small"
      >
        {item.status}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Date",
    render: (item) => (
      <span className="text-font-tertiary text-xs">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    ),
  },
];

export default function MetricsPage() {
  const {
    summary,
    items,
    isLoadingSummary,
    isLoadingList,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useMetrics();

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3}>Metrics</Heading>
        <p className="mt-1 text-sm text-font-tertiary">
          Monitor AI analysis usage, cost, and performance.
        </p>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <MetricsSummary summary={summary} isLoading={isLoadingSummary} />

      <div>
        <Heading level={5} className="mb-4">
          Individual Metrics
        </Heading>
        <DataTable
          columns={columns}
          data={items}
          isLoading={isLoadingList}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          emptyMessage="No metrics recorded yet."
        />
      </div>
    </div>
  );
}
