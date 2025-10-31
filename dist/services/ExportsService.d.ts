import type { CreateExportRequest } from '../models/CreateExportRequest';
import type { JobAccepted } from '../models/JobAccepted';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ExportsService {
    /**
     * Create an export job
     * Starts an asynchronous **export job** for existing content. You can export either a **Subject** (rich learning content) or a **Curriculum** (structured content).
     * The response is a job reference that can be polled for status or used to retrieve artifacts upon completion.
     * **Terminology:**
     * - **Subject**: User-facing learning content (with topics, points, etc.) identified by a UUID (`subjectId`).
     * - **Curriculum**: Structured course definition (modules/lessons) identified by a string (`curriculumId`).
     * **Notes:**
     * - Either `subjectId` or `curriculumId` **must** be provided (if both are provided, `subjectId` is preferred and used).
     * - Multiple output formats can be requested in one job (e.g., PPTX + PDF + Jira).
     * - Supported outputs differ: a subject can produce all types (slides, docs, integrations, etc.), whereas a curriculum-based export supports core formats (pptx, pdf, txt, video).
     * - Use the returned `statusUrl` (or the `Location` header) to poll for job status. Artifacts will be available via the job’s artifact list when the job succeeds.
     * @param requestBody
     * @returns JobAccepted Accepted; export job created
     * @throws ApiError
     */
    static createExport(requestBody: CreateExportRequest): CancelablePromise<JobAccepted>;
}
