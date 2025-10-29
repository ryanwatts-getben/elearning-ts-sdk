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
