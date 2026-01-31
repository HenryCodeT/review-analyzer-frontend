"use client";

import { useState, useCallback } from "react";
import { reviewService } from "@/lib/api/services";
import { reviewUsagesService } from "@/lib/api/services";
import type { ReviewResponseDto } from "@/lib/api/dto/review";
import { ApiError } from "@/lib/api";

export function useReviewAnalysis() {
  const [result, setResult] = useState<ReviewResponseDto | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);

  const analyze = useCallback(async (text: string, language?: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setSendSuccess(false);

    try {
      const response = await reviewService.analyze({ text, language });
      setResult(response.data);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Unexpected error while analyzing the review";
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const sendResponse = useCallback(
    async (editedResponse: string) => {
      if (!result) return;

      setIsSending(true);
      setError(null);
      setSendSuccess(false);

      try {
        await reviewUsagesService.create({
          reviewId: result.reviewId,
          editedResponse,
          responseSent: true,
        });
        await reviewUsagesService.markAsSent(result.reviewId);
        setSendSuccess(true);
      } catch (err) {
        const message =
          err instanceof ApiError
            ? err.message
            : "Unexpected error while sending the response";
        setError(message);
      } finally {
        setIsSending(false);
      }
    },
    [result],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setSendSuccess(false);
  }, []);

  return {
    result,
    isAnalyzing,
    isSending,
    error,
    sendSuccess,
    analyze,
    sendResponse,
    reset,
  };
}
