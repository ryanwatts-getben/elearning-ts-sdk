import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArtifactsService {
    /**
     * List job artifacts
     * Lists artifacts produced by a job. Use ETag/If-None-Match to poll efficiently.
     * Notes:
     * - On 304 Not Modified, re-use your cached artifact list.
     * - Each artifact’s `id` can be resolved to a download URL via `GET /v1/artifacts/{artifactId}`.
     * @param jobId
     * @param ifNoneMatch
     * @returns ArtifactList Artifacts
     * @throws ApiError
     */
    static listArtifacts(jobId, ifNoneMatch) {
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
     * Returns a time-limited, single-use URL to download the artifact directly from storage.
     * Notes:
     * - The URL expires at `expiresAt`; fetch within that window.
     * - If the artifact is expired or unavailable, 404 is returned.
     * @param artifactId
     * @returns ArtifactLink Download URL
     * @throws ApiError
     */
    static getArtifact(artifactId) {
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
