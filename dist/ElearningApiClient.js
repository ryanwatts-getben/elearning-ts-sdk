/*
  High-level typed client wrapper for the generated SDK services.
  Provides:
  - Instance-based configuration (baseUrl, token resolver, headers)
  - Optional verbose logging for requests/responses
  - Convenience methods mirroring DefaultService with idempotency
*/
import { OpenAPI } from './core/OpenAPI';
import { IngestService } from './services/IngestService';
import { CurriculaService } from './services/CurriculaService';
import { JobsService } from './services/JobsService';
import { ArtifactsService } from './services/ArtifactsService';
export class ElearningApiClient {
    constructor(options) {
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
            if (typeof this.options.token === 'string')
                return this.options.token;
            if (typeof this.options.token === 'function') {
                const v = await this.options.token({ path: 'dynamic', method: 'dynamic' });
                return v ?? '';
            }
            return '';
        };
    }
    setBaseUrl(baseUrl) {
        this.options.baseUrl = baseUrl;
        OpenAPI.BASE = baseUrl;
    }
    setToken(token) {
        this.options.token = token;
        OpenAPI.TOKEN = async () => {
            if (typeof token === 'string')
                return token;
            if (typeof token === 'function') {
                const v = await token({ path: 'dynamic', method: 'dynamic' });
                return v ?? '';
            }
            return '';
        };
    }
    setVerbose(verbose) {
        this.options.verbose = verbose;
    }
    log(message, details) {
        if (!this.options.verbose)
            return;
        try {
            if (details !== undefined) {
                // Avoid logging secrets/tokens
                // Log a shallow clone with potential sensitive keys removed.
                const redact = (obj) => {
                    if (obj && typeof obj === 'object') {
                        const shallow = {};
                        Object.entries(obj).forEach(([k, v]) => {
                            const lower = k.toLowerCase();
                            if (lower.includes('authorization') || lower.includes('token') || lower.includes('secret')) {
                                shallow[k] = '[REDACTED]';
                            }
                            else {
                                shallow[k] = v;
                            }
                        });
                        return shallow;
                    }
                    return obj;
                };
                // eslint-disable-next-line no-console
                console.debug(`[sdk] ${message}`, redact(details));
            }
            else {
                // eslint-disable-next-line no-console
                console.debug(`[sdk] ${message}`);
            }
        }
        catch {
            // eslint-disable-next-line no-console
            console.debug(`[sdk] ${message}`);
        }
    }
    // Ingest
    async createUpload(request, idempotencyKey) {
        this.log('createUpload: request', { request, idempotencyKey });
        const result = await IngestService.createUpload(request, idempotencyKey);
        this.log('createUpload: response', result);
        return result;
    }
    async registerSource(request) {
        this.log('registerSource: request', { request });
        const result = await IngestService.registerSource(request);
        this.log('registerSource: response', result);
        return result;
    }
    // Curricula and exports
    async createCurriculum(request) {
        this.log('createCurriculum: request', { request });
        const result = await CurriculaService.createCurriculum(request);
        this.log('createCurriculum: response', result);
        return result;
    }
    async createExport(request) {
        this.log('createExport: request', { request });
        const result = await JobsService.createExport(request);
        this.log('createExport: response', result);
        return result;
    }
    // Orchestration
    async processSubject(request, idempotencyKey) {
        this.log('processSubject: request', { request, idempotencyKey });
        const result = await JobsService.processSubject(request, idempotencyKey);
        this.log('processSubject: response', result);
        return result;
    }
    // Jobs and artifacts
    async getJob(jobId) {
        this.log('getJob: request', { jobId });
        const result = await JobsService.getJob(jobId);
        this.log('getJob: response', result);
        return result;
    }
    async cancelJob(jobId) {
        this.log('cancelJob: request', { jobId });
        const result = await JobsService.cancelJob(jobId);
        this.log('cancelJob: response', result);
        return result;
    }
    async listJobArtifacts(jobId, ifNoneMatch) {
        this.log('listJobArtifacts: request', { jobId, ifNoneMatch });
        const result = await JobsService.listArtifacts(jobId, ifNoneMatch);
        this.log('listJobArtifacts: response', result);
        return result;
    }
    async getArtifact(artifactId) {
        this.log('getArtifact: request', { artifactId });
        const result = await ArtifactsService.getArtifact(artifactId);
        this.log('getArtifact: response', result);
        return result;
    }
}
