import type { CancelablePromise } from '../core/CancelablePromise';
export declare class AuthService {
    /**
     * Start Google OAuth (Authorization Code + PKCE)
     * Redirects to Google with PKCE. Stores transient state and code_verifier in secure cookies.
     * @returns void
     * @throws ApiError
     */
    static oauthAuthorize(): CancelablePromise<void>;
    /**
     * OAuth callback handler (Google)
     * Verifies state, exchanges code with Google, mints first‑party access/refresh tokens.
     * @returns void
     * @throws ApiError
     */
    static oauthCallbackGoogle(): CancelablePromise<void>;
    /**
     * OAuth 2.0 token endpoint
     * Issues first‑party access tokens. Supports refresh_token and client_credentials grants.
     * @param formData
     * @returns any Token response
     * @throws ApiError
     */
    static oauthToken(formData: {
        grant_type?: 'authorization_code' | 'refresh_token' | 'client_credentials';
        code?: string;
        code_verifier?: string;
        refresh_token?: string;
        /**
         * Space-delimited scopes (e.g., 'ingest:write jobs:read').
         */
        scope?: string;
        client_id?: string;
        client_secret?: string;
    }): CancelablePromise<any>;
    /**
     * Revoke refresh token
     * Revokes a refresh token; subsequent use fails.
     * @param formData
     * @returns any Revoked
     * @throws ApiError
     */
    static oauthRevoke(formData: {
        token?: string;
    }): CancelablePromise<any>;
}
