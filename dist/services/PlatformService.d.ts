import type { CancelablePromise } from '../core/CancelablePromise';
export declare class PlatformService {
    /**
     * OIDC discovery document
     * OpenID Provider Configuration Information (per OIDC).
     * @returns any OK
     * @throws ApiError
     */
    static openIdConfiguration(): CancelablePromise<any>;
    /**
     * JSON Web Key Set
     * Public keys used to verify RS256 access tokens.
     * @returns any OK
     * @throws ApiError
     */
    static jwks(): CancelablePromise<any>;
    /**
     * Health check
     * Returns 200 OK when the API is up. No authentication required.
     * @returns any OK
     * @throws ApiError
     */
    static health(): CancelablePromise<{
        status?: string;
    }>;
}
