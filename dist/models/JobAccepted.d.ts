export type JobAccepted = {
    /**
     * Identifier of the newly created job.
     */
    jobId: string;
    /**
     * Relative or absolute URL to poll job status.
     */
    statusUrl: string;
};
