export type CreateUploadRequest = {
    filename: string
    mimeType: string
    sizeBytes: number
    sha256: string
    region?: string
}

export type CreateUploadResponse = {
    sourceId: string
    uploadUrl: string
    expiresAt: string
    fields?: Record<string, string>
}

export type ProcessSubjectRequest = {
    subject: { title: string; options?: Record<string, unknown> }
    sources?: Array<{ sourceId?: string; url?: string }>
    outputs: Array<'pptx' | 'pdf' | 'txt' | 'video'>
    webhook?: { url: string; secretId?: string }
}

export type JobAccepted = { jobId: string; statusUrl: string }

export type Job = {
    id: string
    status: 'queued' | 'running' | 'succeeded' | 'failed' | 'canceled'
    progress?: number
    stage?: string
    submittedAt: string
    updatedAt?: string
    artifacts?: { items: Array<{ id: string; type: string; filename: string; sha256?: string; sizeBytes?: number; expiresAt?: string }> }
    error?: { code?: string; message?: string }
}

export type ArtifactLink = { downloadUrl: string; expiresAt: string }

export class ElearningApiClient {
    private baseUrl: string
    private token: string

    constructor(options: { baseUrl: string; token: string }) {
        this.baseUrl = options.baseUrl.replace(/\/$/, '')
        this.token = options.token
    }

    private async request<T>(path: string, init: RequestInit = {}, idempotencyKey?: string): Promise<T> {
        const headers: Record<string, string> = {
            'authorization': `Bearer ${this.token}`,
            'accept': 'application/json',
            ...(init.headers as Record<string, string> | undefined),
        }
        if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey
        const res = await fetch(`${this.baseUrl}${path}`, { ...init, headers })
        if (!res.ok) {
            const body = await res.text()
            throw new Error(`HTTP ${res.status}: ${body}`)
        }
        if (res.status === 204) return undefined as unknown as T
        return (await res.json()) as T
    }

    // Ingest
    createUpload(body: CreateUploadRequest, idempotencyKey?: string) {
        return this.request<CreateUploadResponse>(`/v1/ingest/uploads`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        }, idempotencyKey)
    }

    registerSource(body: { sourceId: string; filename?: string; mimeType?: string; sizeBytes?: number; sha256?: string }, idempotencyKey?: string) {
        return this.request<{ sourceId: string; avStatus: 'pending' | 'clean' | 'infected' }>(`/v1/ingest/sources`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        }, idempotencyKey)
    }

    // Curricula
    createCurriculum(body: { schema: unknown }) {
        return this.request<{ curriculumId: string }>(`/v1/curricula`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        })
    }

    // Exports (Step-by-step)
    createExport(body: { curriculumId: string; outputs: ProcessSubjectRequest['outputs'] }) {
        return this.request<JobAccepted>(`/v1/exports`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        })
    }

    // Single-POST orchestration
    processSubject(body: ProcessSubjectRequest, idempotencyKey?: string) {
        return this.request<JobAccepted>(`/v1/subjects/process`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body),
        }, idempotencyKey)
    }

    // Jobs and artifacts
    getJob(jobId: string) {
        return this.request<Job>(`/v1/jobs/${encodeURIComponent(jobId)}`)
    }

    cancelJob(jobId: string) {
        return this.request<void>(`/v1/jobs/${encodeURIComponent(jobId)}/cancel`, { method: 'POST' })
    }

    listJobArtifacts(jobId: string, ifNoneMatch?: string) {
        const headers: Record<string, string> = {}
        if (ifNoneMatch) headers['If-None-Match'] = ifNoneMatch
        return this.request<{ items: Job['artifacts']['items'] }>(`/v1/jobs/${encodeURIComponent(jobId)}/artifacts`, { headers })
    }

    getArtifact(artifactId: string) {
        return this.request<ArtifactLink>(`/v1/artifacts/${encodeURIComponent(artifactId)}`)
    }
}


