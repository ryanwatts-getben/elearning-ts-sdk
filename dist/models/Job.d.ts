import type { ArtifactList } from './ArtifactList';
import type { Problem } from './Problem';
export type Job = {
    /**
     * Job identifier.
     */
    id: string;
    /**
     * Current lifecycle state.
     */
    status: Job.status;
    /**
     * Best-effort completion percentage.
     */
    progress?: number;
    /**
     * High-level phase label (e.g., ingesting, processing, exporting). Values are implementation-defined.
     */
    stage?: string;
    /**
     * When the job was submitted.
     */
    submittedAt: string;
    /**
     * Last status update time.
     */
    updatedAt?: string;
    artifacts?: ArtifactList;
    error?: Problem;
};
export declare namespace Job {
    /**
     * Current lifecycle state.
     */
    enum status {
        QUEUED = "queued",
        RUNNING = "running",
        SUCCEEDED = "succeeded",
        FAILED = "failed",
        CANCELED = "canceled"
    }
}
