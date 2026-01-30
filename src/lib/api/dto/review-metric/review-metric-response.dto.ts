export interface ReviewMetricItemDto {
  id: string;
  reviewId: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCost: number;
  latencyMs: number;
  status: string;
  createdAt: string;
}

export interface ReviewMetricListResponseDto {
  items: ReviewMetricItemDto[];
  total: number;
}

export interface SentimentBreakdownDto {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ReviewMetricSummaryResponseDto {
  totalReviews: number;
  totalTokens: number;
  totalCost: number;
  averageLatencyMs: number;
  successCount: number;
  errorCount: number;
  sentimentBreakdown: SentimentBreakdownDto;
}
