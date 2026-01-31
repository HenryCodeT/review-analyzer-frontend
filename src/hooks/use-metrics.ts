"use client";

import { useState, useCallback, useEffect } from "react";
import { reviewMetricsService } from "@/lib/api/services";
import type {
  ReviewMetricItemDto,
  ReviewMetricSummaryResponseDto,
} from "@/lib/api/dto/review-metric";
import { ApiError } from "@/lib/api";

const PAGE_SIZE = 20;

export function useMetrics() {
  const [summary, setSummary] = useState<ReviewMetricSummaryResponseDto | null>(
    null,
  );
  const [items, setItems] = useState<ReviewMetricItemDto[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoadingSummary(true);
    try {
      const response = await reviewMetricsService.getSummary();
      setSummary(response.data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error loading metrics summary";
      setError(message);
    } finally {
      setIsLoadingSummary(false);
    }
  }, []);

  const fetchList = useCallback(async (newOffset: number) => {
    setIsLoadingList(true);
    setError(null);

    try {
      const response = await reviewMetricsService.getAll(PAGE_SIZE, newOffset);
      if (response.data) {
        setItems(response.data.items);
        setTotal(response.data.total);
        setOffset(newOffset);
      }
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error loading metrics";
      setError(message);
    } finally {
      setIsLoadingList(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    const newOffset = offset + PAGE_SIZE;
    if (newOffset < total) fetchList(newOffset);
  }, [offset, total, fetchList]);

  const prevPage = useCallback(() => {
    const newOffset = Math.max(0, offset - PAGE_SIZE);
    fetchList(newOffset);
  }, [offset, fetchList]);

  useEffect(() => {
    fetchSummary();
    fetchList(0);
  }, [fetchSummary, fetchList]);

  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return {
    summary,
    items,
    total,
    isLoadingSummary,
    isLoadingList,
    error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    refresh: () => {
      fetchSummary();
      fetchList(offset);
    },
  };
}
