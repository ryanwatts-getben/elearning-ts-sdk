/**
 * An idempotency key to ensure a POST request is executed only once.
 * If the same key is reused with an identical request body, the server will return the original result instead of creating a duplicate resource.
 * The key should be unique per distinct operation attempt.
 */
export type IdempotencyKey = string;
