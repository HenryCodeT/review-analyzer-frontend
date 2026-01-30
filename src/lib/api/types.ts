export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  code: string | null;
  traceId: string;
}
