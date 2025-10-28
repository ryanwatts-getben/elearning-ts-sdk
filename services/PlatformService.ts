/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlatformService {
    /**
     * OIDC discovery document
     * OpenID Provider Configuration Information (per OIDC).
     * @returns any OK
     * @throws ApiError
     */
    public static openIdConfiguration(): CancelablePromise<any> {
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
    public static jwks(): CancelablePromise<any> {
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
    public static oauthAuthorize(): CancelablePromise<void> {
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
    public static oauthCallbackGoogle(): CancelablePromise<void> {
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
    public static oauthToken(
        formData: {
            grant_type?: 'authorization_code' | 'refresh_token' | 'client_credentials';
            code?: string;
            code_verifier?: string;
            refresh_token?: string;
            scope?: string;
            client_id?: string;
            client_secret?: string;
        },
    ): CancelablePromise<any> {
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
    public static oauthRevoke(
        formData: {
            token?: string;
        },
    ): CancelablePromise<any> {
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
    public static health(): CancelablePromise<{
        status?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
}
