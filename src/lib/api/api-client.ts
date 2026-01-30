import { ApiError, ApiErrorCode } from "./api-error";
import { ApiResponse } from "./types";

type RequestOptions = Omit<RequestInit, "body" | "method">;

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  }

  /**
   * Process API response and handle errors
   */
  private async processResponse<T>(
    response: Response,
  ): Promise<ApiResponse<T>> {
    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new ApiError(
        result.error ?? "An unexpected error occurred",
        (result.code as ApiErrorCode) ?? "INTERNAL_ERROR",
        response.status,
      );
    }

    return result;
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T, B = unknown>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T, B = unknown>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T, B = unknown>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return this.processResponse<T>(response);
  }

  /**
   * Download file (returns raw Response)
   */
  async downloadFile(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      const result = await response.json();
      throw new ApiError(
        result.error ?? "Download failed",
        (result.code as ApiErrorCode) ?? "INTERNAL_ERROR",
        response.status,
      );
    }

    return response;
  }

  /**
   * POST and download file
   */
  async postDownloadFile<B = unknown>(
    endpoint: string,
    body: B,
    options?: RequestOptions,
  ): Promise<Response> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      const result = await response.json();
      throw new ApiError(
        result.error ?? "Download failed",
        (result.code as ApiErrorCode) ?? "INTERNAL_ERROR",
        response.status,
      );
    }

    return response;
  }
}

// Singleton instance
const api = new ApiClient();

export { api, ApiClient };
