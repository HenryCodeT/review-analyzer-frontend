/**
 * Error codes from backend exceptions.ts:
 *
 * | Code           | HTTP | When                              |
 * |----------------|------|-----------------------------------|
 * | VALIDATION     | 400  | Missing or out-of-range input     |
 * | NOT_FOUND      | 404  | Entity not found in DB            |
 * | INTERNAL_ERROR | 500  | Unhandled / infrastructure errors |
 * | ALREADY_EXISTS | 409  | Duplicate resource                |
 */
export type ApiErrorCode =
  | "VALIDATION"
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: number;

  constructor(message: string, code: ApiErrorCode, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
