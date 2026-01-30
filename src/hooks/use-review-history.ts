"use client";

import { useState, useCallback, useEffect } from "react";
import { reviewService } from "@/lib/api/services";
import type { ReviewHistoryItemDto } from "@/lib/api/dto/review";
import { ApiError } from "@/lib/api";

const PAGE_SIZE = 20;

export function useReviewHistory() {
  const [items, setItems] = useState<ReviewHistoryItemDto[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async (newOffset: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewService.getHistory(PAGE_SIZE, newOffset);
      if (response.data) {
        setItems(response.data.items);
        setTotal(response.data.total);
        setOffset(newOffset);
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error al cargar el historial";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    const newOffset = offset + PAGE_SIZE;
    if (newOffset < total) fetchHistory(newOffset);
  }, [offset, total, fetchHistory]);

  const prevPage = useCallback(() => {
    const newOffset = Math.max(0, offset - PAGE_SIZE);
    fetchHistory(newOffset);
  }, [offset, fetchHistory]);

  useEffect(() => {
    fetchHistory(0);
  }, [fetchHistory]);

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
    refresh: () => fetchHistory(offset),
  };
}
