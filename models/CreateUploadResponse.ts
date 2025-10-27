/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateUploadResponse = {
    /**
     * Stable identifier for the uploaded object to reference later.
     */
    sourceId: string;
    /**
     * Pre-signed URL for direct upload.
     */
    uploadUrl: string;
    /**
     * RFC3339 timestamp when the URL expires.
     */
    expiresAt: string;
    /**
     * Optional POST form fields required by the storage provider.
     */
    fields?: Record<string, string>;
};

