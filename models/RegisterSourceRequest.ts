/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterSourceRequest = {
    /**
     * Identifier returned by the upload creation step.
     */
    sourceId: string;
    /**
     * File name override if different from the upload step.
     */
    filename?: string;
    /**
     * Media type override if different from the upload step.
     */
    mimeType?: string;
    /**
     * File size override if different from the upload step.
     */
    sizeBytes?: number;
    /**
     * Hex-encoded SHA-256 digest. Should match the uploaded object.
     */
    sha256?: string;
};

