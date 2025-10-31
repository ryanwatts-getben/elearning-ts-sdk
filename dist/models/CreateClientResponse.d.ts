export type CreateClientResponse = {
    /**
     * The newly created client's ID.
     */
    client_id: string;
    /**
     * The newly generated client secret. **Write this down – it will not be shown again.**
     */
    client_secret: string;
    /**
     * Name of the client.
     */
    name: string;
    /**
     * Scopes assigned to the client.
     */
    scopes: Array<string>;
    /**
     * Registered redirect URIs.
     */
    redirect_uris?: Array<string>;
};
