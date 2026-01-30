import { api } from "../api-client";
import type {
  ReviewMetricListResponseDto,
  ReviewMetricSummaryResponseDto,
} from "../dto/review-metric/review-metric-response.dto";

export const reviewMetricsService = {
  getAll(limit = 20, offset = 0) {
    return api.get<ReviewMetricListResponseDto>(
      `api/review-metrics?limit=${limit}&offset=${offset}`,
    );
  },

  getSummary() {
    return api.get<ReviewMetricSummaryResponseDto>("api/review-metrics/summary");
  },
};
