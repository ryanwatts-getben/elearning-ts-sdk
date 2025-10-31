export type JobAccepted = {
    /**
     * Identifier of the job that was created and queued.
     */
    jobId: string;
    /**
     * Relative URL to query the job status (GET request).
     */
    statusUrl: string;
};
