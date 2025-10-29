/**
 * ElearningApiClient - Unified client wrapper for the GenixSuite Learn API v1
 *
 * Provides a simplified interface over the generated service classes, handling
 * authentication, base URL configuration, and idempotency keys automatically.
 *
 * @example
 * ```ts
 * const client = new ElearningApiClient({
 *   baseUrl: 'https://app.genixsuite.com',
 *   token: process.env.API_TOKEN!,
 *   verbose: true,
 * })
 *
 * const upload = await client.createUpload({
 *   filename: 'doc.pdf',
 *   mimeType: 'application/pdf',
 *   sizeBytes: 1024,
 *   sha256: '...'
 * }, 'idem-123')
 * ```
 */
import { OpenAPI } from './core/OpenAPI';
import { IngestService } from './services/IngestService';
import { CurriculaService } from './services/CurriculaService';
import { JobsService } from './services/JobsService';
import { ArtifactsService } from './services/ArtifactsService';
/**
 * Unified client for the GenixSuite Learn API v1
 */
export class ElearningApiClient {
    constructor(config) {
        this.config = config;
        // Configure OpenAPI base URL
        OpenAPI.BASE = config.baseUrl;
        // Configure token resolver
        if (typeof config.token === 'string') {
            OpenAPI.TOKEN = config.token;
        }
        else {
            OpenAPI.TOKEN = config.token;
        }
        if (config.verbose) {
            // Verbose logging would be implemented here if needed
            // For now, we rely on the underlying request library
        }
    }
    /**
     * Create a presigned URL for uploading a source file
     *
     * @param request - Upload request details
     * @param idempotencyKey - Optional idempotency key for safe retries
     * @returns Presigned upload URL and source ID
     */
    async createUpload(request, idempotencyKey) {
        return IngestService.createUpload(request, idempotencyKey);
    }
    /**
     * Register a previously uploaded object as a Source for processing
     *
     * @param request - Source registration details
     * @returns Registered source details with AV status
     */
    async registerSource(request) {
        return IngestService.registerSource(request);
    }
    /**
     * Create and validate a curriculum definition
     *
     * @param request - Curriculum creation request
     * @returns Created curriculum ID
     */
    async createCurriculum(request) {
        return CurriculaService.createCurriculum(request);
    }
    /**
     * Single-call endpoint to process a subject and generate outputs asynchronously
     *
     * @param request - Subject processing request with sources and outputs
     * @param idempotencyKey - Optional idempotency key for safe retries
     * @returns Job acceptance details with job ID and status URL
     */
    async processSubject(request, idempotencyKey) {
        return JobsService.processSubject(request, idempotencyKey);
    }
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
    async createExport(request) {
        return JobsService.createExport(request);
    }
    /**
     * Get the current status and progress of a job
     *
     * @param jobId - Job identifier
     * @returns Job status, progress, stage, and artifacts
     */
    async getJob(jobId) {
        return JobsService.getJob(jobId);
    }
    /**
     * Request cancellation of a queued or running job
     *
     * @param jobId - Job identifier to cancel
     * @returns Correlation ID for the cancellation request
     */
    async cancelJob(jobId) {
        return JobsService.cancelJob(jobId);
    }
    /**
     * List artifacts produced by a job
     *
     * @param jobId - Job identifier
     * @returns List of artifacts with metadata
     */
    async listJobArtifacts(jobId) {
        return JobsService.listArtifacts(jobId);
    }
    /**
     * Get a temporary download URL for an artifact
     *
     * @param artifactId - Artifact identifier
     * @returns Download URL and expiration time
     */
    async getArtifact(artifactId) {
        return ArtifactsService.getArtifact(artifactId);
    }
}
