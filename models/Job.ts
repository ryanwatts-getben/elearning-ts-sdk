/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtifactList } from './ArtifactList';
import type { Problem } from './Problem';
export type Job = {
    id: string;
    status: Job.status;
    progress?: number;
    stage?: string;
    submittedAt: string;
    updatedAt?: string;
    artifacts?: ArtifactList;
    error?: Problem;
};
export namespace Job {
    export enum status {
        QUEUED = 'queued',
        RUNNING = 'running',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
        CANCELED = 'canceled',
    }
}

