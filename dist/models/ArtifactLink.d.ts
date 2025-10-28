export type ArtifactLink = {
    /**
     * Time-limited URL for direct download of the artifact.
     */
    downloadUrl: string;
    /**
     * When the download link expires.
     */
    expiresAt: string;
};
