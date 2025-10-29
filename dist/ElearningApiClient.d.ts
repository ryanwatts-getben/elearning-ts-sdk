import type { CreateUploadRequest } from './models/CreateUploadRequest';
import type { CreateUploadResponse } from './models/CreateUploadResponse';
import type { RegisterSourceRequest } from './models/RegisterSourceRequest';
import type { RegisterSourceResponse } from './models/RegisterSourceResponse';
import type { CreateCurriculumRequest } from './models/CreateCurriculumRequest';
import type { CreateCurriculumResponse } from './models/CreateCurriculumResponse';
import type { CreateExportRequest } from './models/CreateExportRequest';
import type { JobAccepted } from './models/JobAccepted';
import type { ProcessSubjectRequest } from './models/ProcessSubjectRequest';
import type { Job } from './models/Job';
import type { ArtifactList } from './models/ArtifactList';
import type { ArtifactLink } from './models/ArtifactLink';
export interface ElearningApiClientConfig {
    /** Base URL for the API (e.g., 'https://app.genixsuite.com') */
    baseUrl: string;
    /** Bearer token or async function that returns a token */
    token: string | (() => Promise<string>);
    /** Enable verbose logging (redacts sensitive fields) */
    verbose?: boolean;
}
/**
 * Unified client for the GenixSuite Learn API v1
 */
export declare class ElearningApiClient {
    private config;
    constructor(config: ElearningApiClientConfig);
    /**
     * Create a presigned URL for uploading a source file
     *
     * @param request - Upload request details
     * @param idempotencyKey - Optional idempotency key for safe retries
     * @returns Presigned upload URL and source ID
     */
    createUpload(request: CreateUploadRequest, idempotencyKey?: string): Promise<CreateUploadResponse>;
    /**
     * Register a previously uploaded object as a Source for processing
     *
     * @param request - Source registration details
     * @returns Registered source details with AV status
     */
    registerSource(request: RegisterSourceRequest): Promise<RegisterSourceResponse>;
    /**
     * Create and validate a curriculum definition
     *
     * @param request - Curriculum creation request
     * @returns Created curriculum ID
     */
    createCurriculum(request: CreateCurriculumRequest): Promise<CreateCurriculumResponse>;
    /**
     * Single-call endpoint to process a subject and generate outputs asynchronously
     *
     * @param request - Subject processing request with sources and outputs
     * @param idempotencyKey - Optional idempotency key for safe retries
     * @returns Job acceptance details with job ID and status URL
     */
    processSubject(request: ProcessSubjectRequest, idempotencyKey?: string): Promise<JobAccepted>;
    /**
     * Create an export job from a subject or curriculum
     *
     * @param request - Export job request (prefer subjectId for full capabilities)
     * @returns Job acceptance details with job ID and status URL
     *
     * @example
     * ```ts
     * // Export from subject (preferred - supports all output types)
     * await client.createExport({
     *   subjectId: '550e8400-e29b-41d4-a716-446655440000',
     *   outputs: ['pptx', 'pdf', 'jira']
     * })
     *
     * // Export from curriculum (structured schema format)
     * await client.createExport({
     *   curriculumId: 'abc123',
     *   outputs: ['pptx']
     * })
     * ```
     */
    createExport(request: CreateExportRequest & {
        subjectId?: string;
        options?: {
            template?: any;
            includeImages?: boolean;
            theme?: any;
        };
    }): Promise<JobAccepted>;
    /**
     * Get the current status and progress of a job
     *
     * @param jobId - Job identifier
     * @returns Job status, progress, stage, and artifacts
     */
    getJob(jobId: string): Promise<Job>;
    /**
     * Request cancellation of a queued or running job
     *
     * @param jobId - Job identifier to cancel
     * @returns Correlation ID for the cancellation request
     */
    cancelJob(jobId: string): Promise<string>;
    /**
     * List artifacts produced by a job
     *
     * @param jobId - Job identifier
     * @returns List of artifacts with metadata
     */
    listJobArtifacts(jobId: string): Promise<ArtifactList>;
    /**
     * Get a temporary download URL for an artifact
     *
     * @param artifactId - Artifact identifier
     * @returns Download URL and expiration time
     */
    getArtifact(artifactId: string): Promise<ArtifactLink>;
}
