import type { OpenAPIConfig } from './core/OpenAPI';
import { JobsService } from './services/JobsService';
import type { CreateUploadRequest } from './models/CreateUploadRequest';
import type { CreateUploadResponse } from './models/CreateUploadResponse';
import type { RegisterSourceRequest } from './models/RegisterSourceRequest';
import type { RegisterSourceResponse } from './models/RegisterSourceResponse';
import type { CreateCurriculumRequest } from './models/CreateCurriculumRequest';
import type { CreateCurriculumResponse } from './models/CreateCurriculumResponse';
import type { CreateExportRequest } from './models/CreateExportRequest';
import type { Job } from './models/Job';
import type { JobAccepted } from './models/JobAccepted';
import type { ArtifactList } from './models/ArtifactList';
import type { ArtifactLink } from './models/ArtifactLink';
export type TokenResolver = string | ((opts: {
    path: string;
    method: string;
}) => Promise<string | undefined>) | undefined;
export type ElearningApiClientOptions = {
    baseUrl?: string;
    token?: TokenResolver;
    withCredentials?: boolean;
    credentialsMode?: OpenAPIConfig['CREDENTIALS'];
    defaultHeaders?: Record<string, string>;
    verbose?: boolean;
};
export declare class ElearningApiClient {
    private readonly options;
    constructor(options?: ElearningApiClientOptions);
    setBaseUrl(baseUrl: string): void;
    setToken(token: TokenResolver): void;
    setVerbose(verbose: boolean): void;
    private log;
    createUpload(request: CreateUploadRequest, idempotencyKey?: string): Promise<CreateUploadResponse>;
    registerSource(request: RegisterSourceRequest): Promise<RegisterSourceResponse>;
    createCurriculum(request: CreateCurriculumRequest): Promise<CreateCurriculumResponse>;
    createExport(request: CreateExportRequest): Promise<JobAccepted>;
    processSubject(request: Parameters<typeof JobsService.processSubject>[0], idempotencyKey?: string): Promise<JobAccepted>;
    getJob(jobId: string): Promise<Job>;
    cancelJob(jobId: string): Promise<string>;
    listJobArtifacts(jobId: string, ifNoneMatch?: string): Promise<ArtifactList>;
    getArtifact(artifactId: string): Promise<ArtifactLink>;
}
