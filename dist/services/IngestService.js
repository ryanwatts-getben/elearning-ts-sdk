import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IngestService {
    /**
     * Create pre-signed URL for uploading a source file
     * Issues a short-lived, single-use pre-signed URL (and optional POST form fields) for direct upload to storage.
     * Notes:
     * - Idempotent with Idempotency-Key: reuse the same key and identical body to receive the same result.
     * - Validate payload before calling; `sha256` must be a 64-character hex digest.
     * - Maximum `sizeBytes` is enforced (see schema). If exceeded, server returns 413.
     * - On success, use `uploadUrl` (and `fields` if present) to perform a browser/server upload.
     * @param requestBody
     * @param idempotencyKey A unique key to make unsafe operations idempotent. Reuse the same key with an identical
     * request body to safely retry without creating duplicate resources. Keys may be reused after 24h.
     * @returns CreateUploadResponse Created
     * @throws ApiError
     */
    static createUpload(requestBody, idempotencyKey) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/ingest/uploads',
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RFC7807 Problem Details`,
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                413: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
    /**
     * Register an uploaded source for later processing
     * Registers a previously uploaded object (from a pre-signed request) as a Source for downstream processing.
     * Notes:
     * - Provide the `sourceId` returned by the upload creation step.
     * - Optional metadata (filename, mimeType, sizeBytes, sha256) can be supplied to enrich the record.
     * - The Source becomes eligible for jobs (e.g., `processSubject`).
     * @param requestBody
     * @returns RegisterSourceResponse Created
     * @throws ApiError
     */
    static registerSource(requestBody) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/ingest/sources',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RFC7807 Problem Details`,
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
