"use client";

import { useState, useCallback } from "react";
import { reviewService } from "@/lib/api/services";
import type { ReviewDetailResponseDto } from "@/lib/api/dto/review";
import { ApiError } from "@/lib/api";

export function useReviewDetail() {
  const [detail, setDetail] = useState<ReviewDetailResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reviewService.getById(id);
      setDetail(response.data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Error al cargar el detalle del review";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setDetail(null);
    setError(null);
  }, []);

  return { detail, isLoading, error, fetchDetail, clear };
}
