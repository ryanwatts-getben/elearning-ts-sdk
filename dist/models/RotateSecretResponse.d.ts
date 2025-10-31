export type RotateSecretResponse = {
    /**
     * Client ID whose secret was rotated.
     */
    client_id: string;
    /**
     * The new client secret.
     */
    client_secret: string;
};
