import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlatformService {
    /**
     * OIDC discovery document
     * OpenID Provider Configuration Information (per OIDC).
     * @returns any OK
     * @throws ApiError
     */
    static openIdConfiguration() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/.well-known/openid-configuration',
        });
    }
    /**
     * JSON Web Key Set
     * Public keys used to verify RS256 access tokens.
     * @returns any OK
     * @throws ApiError
     */
    static jwks() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/.well-known/jwks.json',
        });
    }
    /**
     * Start Google OAuth (Authorization Code + PKCE)
     * Redirects to Google with PKCE. Stores transient state and code_verifier in secure cookies.
     * @returns void
     * @throws ApiError
     */
    static oauthAuthorize() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/authorize',
            errors: {
                302: `Redirect to Google`,
            },
        });
    }
    /**
     * OAuth callback handler (Google)
     * Verifies state, exchanges code with Google, mints first‑party access/refresh tokens.
     * @returns void
     * @throws ApiError
     */
    static oauthCallbackGoogle() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/callback/google',
            errors: {
                302: `Redirect to app`,
            },
        });
    }
    /**
     * OAuth 2.0 token endpoint
     * Issues first‑party access tokens. Supports refresh_token and client_credentials grants.
     * @param formData
     * @returns any Token response
     * @throws ApiError
     */
    static oauthToken(formData) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oauth2/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `RFC7807 Problem Details`,
                401: `RFC7807 Problem Details`,
            },
        });
    }
    /**
     * Revoke refresh token
     * Revokes a refresh token; subsequent use fails.
     * @param formData
     * @returns any Revoked
     * @throws ApiError
     */
    static oauthRevoke(formData) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/oauth2/revoke',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `RFC7807 Problem Details`,
            },
        });
    }
    /**
     * Health check
     * Returns 200 OK when the API is up. No authentication required.
     * @returns any OK
     * @throws ApiError
     */
    static health() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
}
