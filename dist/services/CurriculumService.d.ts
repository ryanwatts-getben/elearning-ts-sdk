import type { CreateCurriculumRequest } from '../models/CreateCurriculumRequest';
import type { CreateCurriculumResponse } from '../models/CreateCurriculumResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class CurriculumService {
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
    static createCurriculum(requestBody: CreateCurriculumRequest): CancelablePromise<CreateCurriculumResponse>;
}
