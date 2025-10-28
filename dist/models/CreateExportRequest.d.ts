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
