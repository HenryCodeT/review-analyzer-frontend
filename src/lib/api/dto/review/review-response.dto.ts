export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export interface ReviewResponseDto {
  reviewId: string;
  summary: string;
  sentiment: Sentiment;
  suggestedActions: string[];
  suggestedResponse: string;
  modelProvider: string;
  modelVersion: string;
  language?: string;
  createdAt: string;
}

export interface ReviewHistoryItemDto {
  reviewId: string;
  rawText: string;
  sentiment: Sentiment;
  createdAt: string;
}

export interface ReviewHistoryResponseDto {
  items: ReviewHistoryItemDto[];
  total: number;
}

export interface ReviewDetailResponseDto {
  reviewId: string;
  rawText: string;
  summary: string;
  sentiment: Sentiment;
  suggestedActions: string[];
  suggestedResponse: string;
  modelProvider: string;
  modelVersion: string;
  language?: string;
  createdAt: string;
}
