/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUploadRequest = {
    /**
     * Original file name (used for content-disposition and UX hints).
     */
    filename: string;
    /**
     * IANA media type of the file to be uploaded.
     */
    mimeType: string;
    /**
     * Declared file size in bytes. Enforced server-side.
     */
    sizeBytes: number;
    /**
     * Lower/upper-case hex-encoded SHA-256 content digest of the file.
     */
    sha256: string;
    /**
     * Optional region hint for storage placement.
     */
    region?: string;
};

