"use client";

import { useState, useCallback, useEffect } from "react";
import { reviewUsagesService } from "@/lib/api/services";
import type { ReviewUsageItemDto } from "@/lib/api/dto/review-usage";
import { ApiError } from "@/lib/api";

const PAGE_SIZE = 20;

export function useReviewUsages() {
  const [items, setItems] = useState<ReviewUsageItemDto[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsages = useCallback(async (newOffset: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewUsagesService.getAll(PAGE_SIZE, newOffset);
      if (response.data) {
        setItems(response.data.items);
        setTotal(response.data.total);
        setOffset(newOffset);
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error al cargar los registros de uso";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    const newOffset = offset + PAGE_SIZE;
    if (newOffset < total) fetchUsages(newOffset);
  }, [offset, total, fetchUsages]);

  const prevPage = useCallback(() => {
    const newOffset = Math.max(0, offset - PAGE_SIZE);
    fetchUsages(newOffset);
  }, [offset, fetchUsages]);

  useEffect(() => {
    fetchUsages(0);
  }, [fetchUsages]);

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    items,
    total,
    isLoading,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    refresh: () => fetchUsages(offset),
  };
}
