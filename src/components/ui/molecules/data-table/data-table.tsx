"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/atoms/button";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onNextPage,
  onPrevPage,
  onRowClick,
  emptyMessage = "No hay datos disponibles",
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn("w-full space-y-3", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} width="100%" height={48} shape="rectangle" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(
          "w-full py-12 text-center text-font-tertiary text-sm",
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto rounded-lg border-2 border-border-secondary">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border-secondary bg-bg-secondary">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left font-semibold text-font-secondary",
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-border-tertiary transition-colors",
                  onRowClick &&
                    "cursor-pointer hover:bg-bg-secondary active:bg-bg-tertiary",
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3", col.className)}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-font-tertiary">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="small"
              disabled={currentPage <= 1}
              onClick={onPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <Button
              variant="default"
              size="small"
              disabled={currentPage >= totalPages}
              onClick={onNextPage}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
