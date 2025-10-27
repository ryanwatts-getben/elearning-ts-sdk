/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Problem = {
    type?: string;
    title: string;
    status: number;
    detail?: string;
    instance?: string;
    /**
     * Stable machine code (e.g., mime_not_allowed, cross_tenant_source, job_terminal, rate_limited)
     */
    code?: string;
    correlationId?: string;
};

