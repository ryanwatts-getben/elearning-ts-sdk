export type ArtifactList = {
    items: Array<{
        /**
         * Artifact identifier.
         */
        id?: string;
        /**
         * Artifact type (pptx, pdf, txt, video).
         */
        type?: string;
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
