export type ProcessSubjectRequest = {
    subject: {
        /**
         * Title of the subject to generate outputs for.
         */
        title: string;
        /**
         * Generation options (implementation-defined).
         */
        options?: Record<string, any>;
    };
    sources?: Array<{
        sourceId?: string;
        url?: string;
    }>;
    /**
     * Output formats to generate.
     */
    outputs: Array<'pptx' | 'pdf' | 'txt' | 'video'>;
    webhook?: {
        /**
         * Callback URL to receive job status updates.
         */
        url?: string;
        /**
         * Identifier for a managed secret used to sign webhook payloads.
         */
        secretId?: string;
    };
};
