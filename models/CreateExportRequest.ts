/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Request to create an export job for a curriculum.
 */
export type CreateExportRequest = {
    /**
     * Curriculum identifier to export.
     */
    curriculumId: string;
    /**
     * One or more output formats to generate.
     */
    outputs: Array<'pptx' | 'pdf' | 'txt' | 'video'>;
};

