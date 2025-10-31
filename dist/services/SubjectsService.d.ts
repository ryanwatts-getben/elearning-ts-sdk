import type { JobAccepted } from '../models/JobAccepted';
import type { ProcessSubjectRequest } from '../models/ProcessSubjectRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SubjectsService {
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
    static processSubject(requestBody: ProcessSubjectRequest, idempotencyKey?: string): CancelablePromise<JobAccepted>;
}
