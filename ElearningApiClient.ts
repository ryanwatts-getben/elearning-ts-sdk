/*
  High-level typed client wrapper for the generated SDK services.
  Provides:
  - Instance-based configuration (baseUrl, token resolver, headers)
  - Optional verbose logging for requests/responses
  - Convenience methods mirroring DefaultService with idempotency
*/

import type { OpenAPIConfig } from './core/OpenAPI';
import { OpenAPI } from './core/OpenAPI';
import { IngestService } from './services/IngestService';
import { CurriculaService } from './services/CurriculaService';
import { JobsService } from './services/JobsService';
import { ArtifactsService } from './services/ArtifactsService';

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

export type TokenResolver = string | ((opts: { path: string; method: string }) => Promise<string | undefined>) | undefined;

export type ElearningApiClientOptions = {
    baseUrl?: string;
    token?: TokenResolver;
    withCredentials?: boolean;
    credentialsMode?: OpenAPIConfig['CREDENTIALS'];
    defaultHeaders?: Record<string, string>;
    verbose?: boolean;
};

export class ElearningApiClient {
    private readonly options: Required<Omit<ElearningApiClientOptions, 'token'>> & { token: TokenResolver };

    constructor(options?: ElearningApiClientOptions) {
        this.options = {
            baseUrl: options?.baseUrl ?? OpenAPI.BASE,
            token: options?.token,
            withCredentials: options?.withCredentials ?? OpenAPI.WITH_CREDENTIALS,
            credentialsMode: options?.credentialsMode ?? OpenAPI.CREDENTIALS,
            defaultHeaders: options?.defaultHeaders ?? {},
            verbose: options?.verbose ?? false,
        };

        // Initialize the shared OpenAPI config for app-wide use.
        // Note: The generated SDK uses a singleton OpenAPI object; changes are global.
        OpenAPI.BASE = this.options.baseUrl;
        OpenAPI.WITH_CREDENTIALS = this.options.withCredentials;
        OpenAPI.CREDENTIALS = this.options.credentialsMode;
        OpenAPI.HEADERS = async () => ({ ...this.options.defaultHeaders });
        OpenAPI.TOKEN = async () => {
            if (typeof this.options.token === 'string') return this.options.token;
            if (typeof this.options.token === 'function') {
                const v = await this.options.token({ path: 'dynamic', method: 'dynamic' });
                return v ?? '';
            }
            return '';
        };
    }

    public setBaseUrl(baseUrl: string): void {
        this.options.baseUrl = baseUrl;
        OpenAPI.BASE = baseUrl;
    }

    public setToken(token: TokenResolver): void {
        this.options.token = token;
        OpenAPI.TOKEN = async () => {
            if (typeof token === 'string') return token;
            if (typeof token === 'function') {
                const v = await token({ path: 'dynamic', method: 'dynamic' });
                return v ?? '';
            }
            return '';
        };
    }

    public setVerbose(verbose: boolean): void {
        this.options.verbose = verbose;
    }

    private log(message: string, details?: unknown): void {
        if (!this.options.verbose) return;
        try {
            if (details !== undefined) {
                // Avoid logging secrets/tokens
                // Log a shallow clone with potential sensitive keys removed.
                const redact = (obj: unknown): unknown => {
                    if (obj && typeof obj === 'object') {
                        const shallow: Record<string, unknown> = {};
                        Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => {
                            const lower = k.toLowerCase();
                            if (lower.includes('authorization') || lower.includes('token') || lower.includes('secret')) {
                                shallow[k] = '[REDACTED]';
                            } else {
                                shallow[k] = v;
                            }
                        });
                        return shallow;
                    }
                    return obj;
                };
                // eslint-disable-next-line no-console
                console.debug(`[sdk] ${message}`, redact(details));
            } else {
                // eslint-disable-next-line no-console
                console.debug(`[sdk] ${message}`);
            }
        } catch {
            // eslint-disable-next-line no-console
            console.debug(`[sdk] ${message}`);
        }
    }

    // Ingest
    public async createUpload(request: CreateUploadRequest, idempotencyKey?: string): Promise<CreateUploadResponse> {
        this.log('createUpload: request', { request, idempotencyKey });
        const result = await IngestService.createUpload(request, idempotencyKey);
        this.log('createUpload: response', result);
        return result;
    }

    public async registerSource(request: RegisterSourceRequest): Promise<RegisterSourceResponse> {
        this.log('registerSource: request', { request });
        const result = await IngestService.registerSource(request);
        this.log('registerSource: response', result);
        return result;
    }

    // Curricula and exports
    public async createCurriculum(request: CreateCurriculumRequest): Promise<CreateCurriculumResponse> {
        this.log('createCurriculum: request', { request });
        const result = await CurriculaService.createCurriculum(request);
        this.log('createCurriculum: response', result);
        return result;
    }

    public async createExport(request: CreateExportRequest): Promise<JobAccepted> {
        this.log('createExport: request', { request });
        const result = await JobsService.createExport(request);
        this.log('createExport: response', result);
        return result;
    }

    // Orchestration
    public async processSubject(request: Parameters<typeof JobsService.processSubject>[0], idempotencyKey?: string): Promise<JobAccepted> {
        this.log('processSubject: request', { request, idempotencyKey });
        const result = await JobsService.processSubject(request, idempotencyKey);
        this.log('processSubject: response', result);
        return result;
    }

    // Jobs and artifacts
    public async getJob(jobId: string): Promise<Job> {
        this.log('getJob: request', { jobId });
        const result = await JobsService.getJob(jobId);
        this.log('getJob: response', result);
        return result;
    }

    public async cancelJob(jobId: string): Promise<string> {
        this.log('cancelJob: request', { jobId });
        const result = await JobsService.cancelJob(jobId);
        this.log('cancelJob: response', result);
        return result;
    }

    public async listJobArtifacts(jobId: string, ifNoneMatch?: string): Promise<ArtifactList> {
        this.log('listJobArtifacts: request', { jobId, ifNoneMatch });
        const result = await JobsService.listArtifacts(jobId, ifNoneMatch);
        this.log('listJobArtifacts: response', result);
        return result;
    }

    public async getArtifact(artifactId: string): Promise<ArtifactLink> {
        this.log('getArtifact: request', { artifactId });
        const result = await ArtifactsService.getArtifact(artifactId);
        this.log('getArtifact: response', result);
        return result;
    }
}


