import { api } from "../api-client";
import type { CreateReviewRequestDto } from "../dto/review/review-request.dto";
import type {
  ReviewResponseDto,
  ReviewHistoryResponseDto,
  ReviewDetailResponseDto,
} from "../dto/review/review-response.dto";

export const reviewService = {
  analyze(body: CreateReviewRequestDto) {
    return api.post<ReviewResponseDto, CreateReviewRequestDto>(
      "api/reviews",
      body,
    );
  },

  getHistory(limit = 20, offset = 0) {
    return api.get<ReviewHistoryResponseDto>(
      `api/reviews/history?limit=${limit}&offset=${offset}`,
    );
  },

  getById(id: string) {
    return api.get<ReviewDetailResponseDto>(`api/reviews/${id}`);
  },
};
