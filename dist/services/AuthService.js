import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * OpenID Connect discovery metadata
     * Returns OAuth2/OIDC configuration metadata, including issuer, authorization, token, and JWKS endpoints, supported scopes, and other capabilities.
     * @returns any OIDC discovery document
     * @throws ApiError
     */
    static oidcDiscovery() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/.well-known/openid-configuration',
        });
    }
    /**
     * JSON Web Key Set (JWKS)
     * Returns the public JSON Web Key Set. These keys are used to verify JWT signatures (e.g., access tokens).  The keys rotate periodically; cache accordingly (`Cache-Control: max-age=300`).
     * @returns any JSON Web Key set
     * @throws ApiError
     */
    static getJwks() {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/.well-known/jwks.json',
        });
    }
    /**
     * OAuth2 token issuance
     * Token endpoint for exchanging credentials for tokens. Supports:
     * - **Authorization Code (with PKCE)** – Exchange a code (and code_verifier) for an access token (and refresh token).
     * - **Refresh Token** – Exchange a refresh token for a new access token (rotating refresh tokens if applicable).
     * - **Client Credentials** – Obtain an access token directly using a client’s ID and secret.
     * The response is a JSON object containing the token and related fields.
     * @param formData
     * @returns any Successful token response
     * @throws ApiError
     */
    static oauthToken(formData) {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oauth2/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Error response (Problem Details)`,
                401: `Error response (Problem Details)`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
