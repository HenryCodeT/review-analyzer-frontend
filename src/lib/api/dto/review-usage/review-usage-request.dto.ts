export interface CreateReviewUsageRequestDto {
  reviewId: string;
  agentId?: string;
  editedResponse?: string;
  responseSent?: boolean;
}
