/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProcessSubjectRequest = {
    subject: {
        title: string;
        options?: Record<string, any>;
    };
    sources?: Array<{
        sourceId?: string;
        url?: string;
    }>;
    outputs: Array<'pptx' | 'pdf' | 'txt' | 'video'>;
    webhook?: {
        url?: string;
        secretId?: string;
    };
};

