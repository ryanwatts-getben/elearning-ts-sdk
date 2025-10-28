import type { ArtifactLink } from '../models/ArtifactLink';
import type { ArtifactList } from '../models/ArtifactList';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ArtifactsService {
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
    static listArtifacts(jobId: string, ifNoneMatch?: string): CancelablePromise<ArtifactList>;
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
    static getArtifact(artifactId: string): CancelablePromise<ArtifactLink>;
}
