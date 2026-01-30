export interface ReviewUsageItemDto {
  id: string;
  reviewId: string;
  agentId: string;
  editedResponse: string;
  responseSent: boolean;
  sentAt: string | null;
  createdAt: string;
}

export interface ReviewUsageListResponseDto {
  items: ReviewUsageItemDto[];
  total: number;
}
