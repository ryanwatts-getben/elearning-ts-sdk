# eLearning API v1 – TypeScript SDK

Install
```bash
npm install --save sdk-ts
```

Usage
```ts
import { ElearningApiClient } from './index'

const client = new ElearningApiClient({ baseUrl: 'https://api.example.com', token: process.env.API_TOKEN! })

// Step 1: presign upload
const upload = await client.createUpload({ filename: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1024, sha256: '...' }, 'idem-123')

// Step 2: register source
await client.registerSource({ sourceId: upload.sourceId, filename: 'doc.pdf', mimeType: 'application/pdf', sizeBytes: 1024, sha256: '...' }, 'idem-123')

// Single-POST orchestration
const job = await client.processSubject({ subject: { title: 'Safety Training' }, outputs: ['pptx'] }, 'idem-456')

// Poll job
const status = await client.getJob(job.jobId)

// List artifacts
const artifacts = await client.listJobArtifacts(job.jobId)

// Download link
const link = await client.getArtifact(artifacts.items[0].id)
```
