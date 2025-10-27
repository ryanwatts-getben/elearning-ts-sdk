/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactLink } from '../models/ArtifactLink';
import type { ArtifactList } from '../models/ArtifactList';
import type { CreateCurriculumRequest } from '../models/CreateCurriculumRequest';
import type { CreateCurriculumResponse } from '../models/CreateCurriculumResponse';
import type { CreateExportRequest } from '../models/CreateExportRequest';
import type { CreateUploadRequest } from '../models/CreateUploadRequest';
import type { CreateUploadResponse } from '../models/CreateUploadResponse';
import type { Job } from '../models/Job';
import type { JobAccepted } from '../models/JobAccepted';
import type { ProcessSubjectRequest } from '../models/ProcessSubjectRequest';
import type { RegisterSourceRequest } from '../models/RegisterSourceRequest';
import type { RegisterSourceResponse } from '../models/RegisterSourceResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Create pre-signed URL for uploading a source file
     * @param requestBody
     * @param idempotencyKey
     * @returns CreateUploadResponse Created
     * @throws ApiError
     */
    public static createUpload(
        requestBody: CreateUploadRequest,
        idempotencyKey?: string,
    ): CancelablePromise<CreateUploadResponse> {
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
     * @param requestBody
     * @returns RegisterSourceResponse Created
     * @throws ApiError
     */
    public static registerSource(
        requestBody: RegisterSourceRequest,
    ): CancelablePromise<RegisterSourceResponse> {
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
    /**
     * Create and validate a curriculum definition
     * @param requestBody
     * @returns CreateCurriculumResponse Created
     * @throws ApiError
     */
    public static createCurriculum(
        requestBody: CreateCurriculumRequest,
    ): CancelablePromise<CreateCurriculumResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/curricula',
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
    /**
     * Create an export job from a curriculum
     * @param requestBody
     * @returns JobAccepted Accepted; job created
     * @throws ApiError
     */
    public static createExport(
        requestBody: CreateExportRequest,
    ): CancelablePromise<JobAccepted> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/exports',
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
    /**
     * Single-call ingest and generate outputs asynchronously
     * @param requestBody
     * @param idempotencyKey
     * @returns JobAccepted Accepted; job created
     * @throws ApiError
     */
    public static processSubject(
        requestBody: ProcessSubjectRequest,
        idempotencyKey?: string,
    ): CancelablePromise<JobAccepted> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subjects/process',
            headers: {
                'Idempotency-Key': idempotencyKey,
            },
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
    /**
     * Get job status and progress
     * @param jobId
     * @returns Job Job status
     * @throws ApiError
     */
    public static getJob(
        jobId: string,
    ): CancelablePromise<Job> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/jobs/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                404: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
    /**
     * Request cancellation of a job
     * @param jobId
     * @returns string Cancellation requested
     * @throws ApiError
     */
    public static cancelJob(
        jobId: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/jobs/{jobId}/cancel',
            path: {
                'jobId': jobId,
            },
            responseHeader: 'RateLimit-Limit',
            errors: {
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                409: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
    /**
     * List job artifacts
     * @param jobId
     * @param ifNoneMatch
     * @returns ArtifactList Artifacts
     * @throws ApiError
     */
    public static listArtifacts(
        jobId: string,
        ifNoneMatch?: string,
    ): CancelablePromise<ArtifactList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/jobs/{jobId}/artifacts',
            path: {
                'jobId': jobId,
            },
            headers: {
                'If-None-Match': ifNoneMatch,
            },
            errors: {
                304: `Not Modified`,
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                404: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
    /**
     * Get a temporary download URL for an artifact
     * @param artifactId
     * @returns ArtifactLink Download URL
     * @throws ApiError
     */
    public static getArtifact(
        artifactId: string,
    ): CancelablePromise<ArtifactLink> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/artifacts/{artifactId}',
            path: {
                'artifactId': artifactId,
            },
            errors: {
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                404: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
