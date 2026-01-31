"use client";

import { Heading } from "@/components/ui/atoms/heading";
import { Badge } from "@/components/ui/atoms/badge";
import { Alert, AlertDescription } from "@/components/ui/atoms/alert";
import { DataTable } from "@/components/ui/molecules/data-table";
import { useReviewUsages } from "@/hooks/use-review-usages";
import type { ReviewUsageItemDto } from "@/lib/api/dto/review-usage";
import type { DataTableColumn } from "@/components/ui/molecules/data-table";

const columns: DataTableColumn<ReviewUsageItemDto>[] = [
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
    key: "agentId",
    header: "Agent",
    render: (item) => (
      <span className="text-sm text-font-primary">
        {item.agentId || (
          <span className="text-font-tertiary">--</span>
        )}
      </span>
    ),
  },
  {
    key: "editedResponse",
    header: "Edited Response",
    className: "max-w-xs",
    render: (item) => (
      <span className="line-clamp-2 text-sm text-font-secondary">
        {item.editedResponse || (
          <span className="text-font-tertiary">--</span>
        )}
      </span>
    ),
  },
  {
    key: "responseSent",
    header: "Sent",
    render: (item) => (
      <Badge
        variant={item.responseSent ? "success" : "default"}
        style="subtle"
        size="small"
      >
        {item.responseSent ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    key: "sentAt",
    header: "Sent Date",
    render: (item) =>
      item.sentAt ? (
        <span className="text-xs text-font-tertiary">
          {new Date(item.sentAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ) : (
        <span className="text-xs text-font-tertiary">--</span>
      ),
  },
  {
    key: "createdAt",
    header: "Created",
    render: (item) => (
      <span className="text-xs text-font-tertiary">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    ),
  },
];

export default function UsagesPage() {
  const {
    items,
    isLoading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useReviewUsages();

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3}>Response Usage</Heading>
        <p className="mt-1 text-sm text-font-tertiary">
          Log of responses generated, edited, and sent to customers.
        </p>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        emptyMessage="No usage records yet."
      />
    </div>
  );
}
