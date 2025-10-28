/**
 * A unique key to make unsafe operations idempotent. Reuse the same key with an identical
 * request body to safely retry without creating duplicate resources. Keys may be reused after 24h.
 */
export type IdempotencyKey = string;
