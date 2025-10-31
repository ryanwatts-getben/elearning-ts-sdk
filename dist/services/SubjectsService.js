import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubjectsService {
    /**
     * Ingest and process subject content
     * Convenience endpoint that creates a **Subject** (learning content) on the fly and immediately starts an export job for it.
     * This single call ingests provided content and triggers generation of specified outputs asynchronously.
     * **Notes:**
     * - Idempotent: you may provide an `Idempotency-Key` to avoid duplicate jobs if the request is retried.
     * - Each entry in `sources` must include either a `sourceId` (for a previously registered source) or a direct `url` to fetch content from.
     * - A `webhook` can be provided to receive job status updates (e.g., completion) via HTTP callbacks.
     * @param requestBody
     * @param idempotencyKey An idempotency key to ensure a POST request is executed only once.
     * If the same key is reused with an identical request body, the server will return the original result instead of creating a duplicate resource.
     * The key should be unique per distinct operation attempt.
     * @returns JobAccepted Accepted; job started
     * @throws ApiError
     */
    static processSubject(requestBody, idempotencyKey) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/subjects/process',
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Error response (Problem Details)`,
                401: `Error response (Problem Details)`,
                403: `Error response (Problem Details)`,
                409: `Conflict – e.g. a referenced source is not ready or an identical idempotent request was replayed with different content.`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
