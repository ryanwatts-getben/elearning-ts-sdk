export type ArtifactList = {
    items: Array<{
        /**
         * Artifact identifier.
         */
        id?: string;
        /**
         * Artifact type. Supported types: pptx, pdf, txt, video, jira, confluence, image.
         * See `/api/v1/exports` for details on each type.
         *
         */
        type?: 'pptx' | 'pdf' | 'txt' | 'video' | 'jira' | 'confluence' | 'image';
        /**
         * Suggested download filename.
         */
        filename?: string;
        /**
         * Optional hex-encoded content digest.
         */
        sha256?: string;
        /**
         * Optional artifact size in bytes.
         */
        sizeBytes?: number;
        /**
         * When the artifact will expire and be deleted.
         */
        expiresAt?: string;
    }>;
};
