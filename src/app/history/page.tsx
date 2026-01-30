"use client";

import { Heading } from "@/components/ui/atoms/heading";
import { Badge } from "@/components/ui/atoms/badge";
import { Alert, AlertDescription } from "@/components/ui/atoms/alert";
import { DataTable } from "@/components/ui/molecules/data-table";
import { ReviewDetail } from "@/components/ui/organisms/review-detail";
import { useReviewHistory } from "@/hooks/use-review-history";
import { useReviewDetail } from "@/hooks/use-review-detail";
import type { ReviewHistoryItemDto, Sentiment } from "@/lib/api/dto/review";
import type { DataTableColumn } from "@/components/ui/molecules/data-table";

const SENTIMENT_VARIANT: Record<Sentiment, "success" | "warning" | "error"> = {
  POSITIVE: "success",
  NEUTRAL: "warning",
  NEGATIVE: "error",
};

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  POSITIVE: "Positivo",
  NEUTRAL: "Neutral",
  NEGATIVE: "Negativo",
};

const columns: DataTableColumn<ReviewHistoryItemDto>[] = [
  {
    key: "rawText",
    header: "Comentario",
    className: "max-w-xs",
    render: (item) => (
      <span className="line-clamp-2 text-font-primary">{item.rawText}</span>
    ),
  },
  {
    key: "sentiment",
    header: "Sentimiento",
    render: (item) => (
      <Badge
        variant={SENTIMENT_VARIANT[item.sentiment]}
        style="subtle"
        size="small"
        dot
      >
        {SENTIMENT_LABEL[item.sentiment]}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Fecha",
    render: (item) => (
      <span className="text-font-tertiary">
        {new Date(item.createdAt).toLocaleDateString("es-ES", {
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

export default function HistoryPage() {
  const {
    items,
    isLoading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useReviewHistory();

  const {
    detail,
    isLoading: isLoadingDetail,
    error: detailError,
    fetchDetail,
    clear,
  } = useReviewDetail();

  const handleRowClick = (item: ReviewHistoryItemDto) => {
    fetchDetail(item.reviewId);
  };

  return (
    <div className="space-y-8">
      <div>
        <Heading level={3}>Historial de Análisis</Heading>
        <p className="mt-1 text-sm text-font-tertiary">
          Consulta los análisis realizados anteriormente.
        </p>
      </div>

      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {detail || isLoadingDetail || detailError ? (
        <ReviewDetail
          detail={detail}
          isLoading={isLoadingDetail}
          error={detailError}
          onClose={clear}
        />
      ) : null}

      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onRowClick={handleRowClick}
        emptyMessage="No hay análisis registrados aún."
      />
    </div>
  );
}
