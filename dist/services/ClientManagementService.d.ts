import type { CreateClientRequest } from '../models/CreateClientRequest';
import type { CreateClientResponse } from '../models/CreateClientResponse';
import type { DeveloperClient } from '../models/DeveloperClient';
import type { RotateSecretResponse } from '../models/RotateSecretResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class ClientManagementService {
    /**
     * List OAuth clients
     * Retrieves all OAuth2 client applications associated with the current user (developer).
     * Requires a valid user session cookie and matching CSRF token.
     * @returns any OK
     * @throws ApiError
     */
    static listClients(): CancelablePromise<{
        items: Array<DeveloperClient>;
    }>;
    /**
     * Create a new OAuth client
     * Registers a new OAuth2 client (credentials for machine-to-machine access or OAuth flows).
     * The client ID and a one-time client secret are returned. **This secret is shown only once – record it securely.**
     * Requires a user session and CSRF protection.
     * @param requestBody
     * @returns CreateClientResponse Created
     * @throws ApiError
     */
    static createClient(requestBody: CreateClientRequest): CancelablePromise<CreateClientResponse>;
    /**
     * Enable a client
     * Re-enables an OAuth client that was disabled, allowing it to be used for token issuance again.
     * No request body is needed. Requires user session + CSRF.
     * @param clientId
     * @returns void
     * @throws ApiError
     */
    static enableClient(clientId: string): CancelablePromise<void>;
    /**
     * Disable a client
     * Disables an OAuth client, immediately revoking its ability to obtain new tokens. Existing tokens may be invalidated depending on implementation.
     * Requires user session + CSRF. No request body.
     * @param clientId
     * @returns void
     * @throws ApiError
     */
    static disableClient(clientId: string): CancelablePromise<void>;
    /**
     * Rotate client secret
     * Generates a new client secret for the specified OAuth client. The old secret is immediately invalidated.
     * The new secret is returned in the response (treat it with the same care as a password). Requires session + CSRF.
     * @param clientId
     * @returns RotateSecretResponse New secret generated
     * @throws ApiError
     */
    static rotateClientSecret(clientId: string): CancelablePromise<RotateSecretResponse>;
}
