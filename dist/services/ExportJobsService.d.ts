import type { ArtifactList } from '../models/ArtifactList';
import type { CreateExportRequest } from '../models/CreateExportRequest';
import type { Job } from '../models/Job';
import type { JobAccepted } from '../models/JobAccepted';
import type { ProcessSubjectRequest } from '../models/ProcessSubjectRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ExportJobsService {
    /**
     * Create an export job from a subject or curriculum
     * Starts an asynchronous export job for a subject (user-facing learning content) or curriculum (structured schema).
     * Returns a `JobAccepted` response with the job ID.
     *
     * Terminology:
     * - **Subject**: User-facing learning content with topics, points, and sources (UUID identifier)
     * - **Curriculum**: Structured schema format with modules and lessons (string identifier)
     *
     * Notes:
     * - Use the `Location` header or `statusUrl` to poll job status.
     * - Either `subjectId` or `curriculumId` must be provided (prefer `subjectId` for full export capabilities).
     * - Multiple outputs can be requested (e.g., `pptx`, `pdf`, `jira`, `confluence`).
     * - `subjectId` exports support: pptx, pdf, jira, confluence, video, image, txt
     * - `curriculumId` exports support: pptx, pdf, txt, video (structured format only)
     * - Artifacts are retrievable once the job succeeds.
     * @param requestBody
     * @returns JobAccepted Accepted; job created
     * @throws ApiError
     */
    static createExport(requestBody: CreateExportRequest): CancelablePromise<JobAccepted>;
    /**
     * Single-call ingest and generate outputs asynchronously
     * Convenience endpoint that accepts a subject with optional sources and immediately creates an export job.
     * Notes:
     * - Idempotent with Idempotency-Key to avoid duplicate jobs on retry.
     * - Each source must specify either `sourceId` (from a prior upload/registration) or a `url` to fetch.
     * - Use `webhook` to receive job updates via callback.
     * @param requestBody
     * @param idempotencyKey A unique key to make unsafe operations idempotent. Reuse the same key with an identical
     * request body to safely retry without creating duplicate resources. Keys may be reused after 24h.
     * @returns JobAccepted Accepted; job created
     * @throws ApiError
     */
    static processSubject(requestBody: ProcessSubjectRequest, idempotencyKey?: string): CancelablePromise<JobAccepted>;
    /**
     * Get job status and progress
     * Polls the current state of a job. Use `status`, `progress`, and `stage` to drive client UX.
     * Notes:
     * - `status` transitions: queued → running → succeeded/failed/canceled.
     * - `artifacts` are populated upon success.
     * - `error` contains an RFC7807 object when the job fails.
     * @param jobId
     * @returns Job Job status
     * @throws ApiError
     */
    static getJob(jobId: string): CancelablePromise<Job>;
    /**
     * Request cancellation of a job
     * Requests cooperative cancellation of a queued or running job. Some jobs may already be terminal or non-cancelable.
     * Notes:
     * - Returns 202 on acceptance; the job will transition to `canceled` shortly thereafter.
     * - Returns 409 if the job is in a terminal state or cannot be canceled.
     * @param jobId
     * @returns string Cancellation requested
     * @throws ApiError
     */
    static cancelJob(jobId: string): CancelablePromise<string>;
    /**
     * List job artifacts
     * Lists artifacts produced by a job. Use ETag/If-None-Match to poll efficiently.
     * Notes:
     * - On 304 Not Modified, re-use your cached artifact list.
     * - Each artifact's `id` can be resolved to a download URL via `GET /api/v1/artifacts/{artifactId}`.
     * @param jobId
     * @param ifNoneMatch
     * @returns ArtifactList Artifacts
     * @throws ApiError
     */
    static listArtifacts(jobId: string, ifNoneMatch?: string): CancelablePromise<ArtifactList>;
}
