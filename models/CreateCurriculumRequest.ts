/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateCurriculumRequest = {
    title: string;
    modules: Array<{
        title: string;
        lessons: Array<{
            title?: string;
            content?: string;
        }>;
    }>;
    metadata?: Record<string, any>;
};

