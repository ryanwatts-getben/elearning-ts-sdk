/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCurriculumRequest } from '../models/CreateCurriculumRequest';
import type { CreateCurriculumResponse } from '../models/CreateCurriculumResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CurriculumService {
    /**
     * Create and validate a curriculum definition
     * Creates a curriculum record comprising modules and lessons. The payload is validated against the schema.
     * Notes:
     * - `title` and at least one module with lesson(s) are required.
     * - Use `metadata` for arbitrary key/value pairs; these are stored as-is.
     * - The returned `curriculumId` can be used to start export jobs.
     * @param requestBody
     * @returns CreateCurriculumResponse Created
     * @throws ApiError
     */
    public static createCurriculum(
        requestBody: CreateCurriculumRequest,
    ): CancelablePromise<CreateCurriculumResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/curricula',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `RFC7807 Problem Details`,
                401: `RFC7807 Problem Details`,
                403: `RFC7807 Problem Details`,
                429: `Rate limit exceeded`,
            },
        });
    }
}
