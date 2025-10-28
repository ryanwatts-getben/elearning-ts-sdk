# eLearning API v1 – TypeScript SDK

Install
```bash
npm install --save sdk-ts
```

Usage
```ts
import { ElearningApiClient } from './index'

// Option A: static bearer token (e.g., client_credentials or SSO access token)
const client = new ElearningApiClient({
  baseUrl: 'https://learn.genixsuite.com',
  token: process.env.API_TOKEN!,
  verbose: true,
})

// Option B: async token resolver (rotate/refresh as needed)
// const client = new ElearningApiClient({
//   baseUrl: 'https://learn.genixsuite.com',
//   token: async () => {
//     return process.env.API_TOKEN
//   },
// })

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

OAuth quickstart

Client Credentials grant (server-to-server):
```ts
import fetch from 'node-fetch'

async function getClientCredentialsToken() {
  const url = 'https://learn.genixsuite.com/api/oauth2/token'
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'jobs:read',
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
  })
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) throw new Error(`token error: ${res.status}`)
  const json = await res.json() as { access_token: string }
  return json.access_token
}

const token = await getClientCredentialsToken()
const client = new ElearningApiClient({ baseUrl: 'https://learn.genixsuite.com', token })
```

Refresh Token grant:
```ts
import fetch from 'node-fetch'

async function refreshAccessToken(refreshToken: string) {
  const url = 'https://learn.genixsuite.com/api/oauth2/token'
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  })
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) throw new Error(`refresh error: ${res.status}`)
  return res.json() as Promise<{ access_token: string; refresh_token?: string }>
}
```

Environment and settings

- issuer: `https://learn.genixsuite.com`
- audience: `elearning-api`
- access tokens are short-lived; use refresh or client credentials for server jobs

Notes

- All methods return typed results; no `any` types are used in public APIs.
- Enable `verbose: true` to get debug logs with sensitive fields redacted.
