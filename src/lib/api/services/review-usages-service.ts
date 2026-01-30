import { api } from "../api-client";
import type { CreateReviewUsageRequestDto } from "../dto/review-usage/review-usage-request.dto";
import type { ReviewUsageListResponseDto } from "../dto/review-usage/review-usage-response.dto";

export const reviewUsagesService = {
  getAll(limit = 20, offset = 0) {
    return api.get<ReviewUsageListResponseDto>(
      `api/review-usages?limit=${limit}&offset=${offset}`,
    );
  },

  create(body: CreateReviewUsageRequestDto) {
    return api.post<void, CreateReviewUsageRequestDto>(
      "api/review-usages",
      body,
    );
  },

  markAsSent(reviewId: string) {
    return api.patch<void, Record<string, never>>(
      `api/review-usages/${reviewId}/sent`,
      {},
    );
  },
};
