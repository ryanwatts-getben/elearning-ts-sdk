/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactLink } from '../models/ArtifactLink';
import type { ArtifactList } from '../models/ArtifactList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArtifactsService {
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
    public static listArtifacts(
        jobId: string,
        ifNoneMatch?: string,
    ): CancelablePromise<ArtifactList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/jobs/{jobId}/artifacts',
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
     * Returns a time-limited, single-use URL to download the artifact directly from storage.
     * Notes:
     * - The URL expires at `expiresAt`; fetch within that window.
     * - If the artifact is expired or unavailable, 404 is returned.
     * @param artifactId
     * @returns ArtifactLink Download URL
     * @throws ApiError
     */
    public static getArtifact(
        artifactId: string,
    ): CancelablePromise<ArtifactLink> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/artifacts/{artifactId}',
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
