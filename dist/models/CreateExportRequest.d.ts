/**
 * Request to create an export job for a subject or curriculum.
 * Prefer `subjectId` for full export capabilities aligned with the UX.
 *
 */
export type CreateExportRequest = {
    /**
     * Curriculum identifier (structured schema format).
     * Use this for curriculum-based exports created via `/api/v1/curricula`.
     * For full export capabilities (including jira, confluence, image), use `subjectId` instead.
     *
     */
    curriculumId?: string;
    /**
     * Subject identifier (user-facing learning content).
     * Preferred for exports as it supports all output types including jira, confluence, and image generation.
     * Subjects are created via the UX or can be processed via `/api/v1/subjects/process`.
     *
     */
    subjectId?: string;
    /**
     * One or more output formats to generate.
     * - `pptx`: PowerPoint presentation file (.pptx). Fully supported for subjects with themes and branding. For curricula, uses structured module/lesson format.
     * - `pdf`: PDF document (.pdf). Fully supported for subjects with formatted content. Includes topics, points, and source references.
     * - `jira`: Jira-ready markdown (.txt) with epics, user stories, and tasks. Subject only. Uses AI to convert curriculum into actionable Jira structure.
     * - `confluence`: Confluence-ready markdown (.txt) with page structure and formatting. Subject only. Uses AI to create documentation-ready content.
     * - `image`: Generated images (.png) for presentation slides. Subject only. Extracts prompts from PowerPoint slides if available, otherwise generates from topic content. Limited to 5 images per export.
     * - `video`: AI-generated video content (.mp4). Subject only. Uses Veo3 for video generation. Requires panel creation (auto-created if none exist). Async processing may take several minutes. Creates placeholder artifact initially.
     * - `txt`: Plain text summary (.txt). Basic text export of curriculum content.
     *
     */
    outputs?: Array<'pptx' | 'pdf' | 'txt' | 'video' | 'jira' | 'confluence' | 'image'>;
    /**
     * Optional sources to include in the export (for curriculum-based exports).
     */
    sources?: Array<{
        /**
         * Previously registered source identifier (from `/api/v1/ingest/sources`)
         */
        sourceId?: string;
    }>;
    /**
     * Export-specific options. These options are passed to the worker and applied during artifact generation.
     * - `template`: (object) Pre-built template structure for PowerPoint exports. Custom slide layouts and content structure.
     * - `includeImages`: (boolean) Whether to generate images for PowerPoint/image exports. Defaults to false.
     * - `theme`: (object) Theme configuration for PowerPoint/PDF exports:
     * - `colorPalette`: (array of strings) Array of hex color codes for branding
     * - `backgroundColor`: (string) Background color as hex code
     * - `logoPlacement`: (string) Logo placement position (e.g., "top-left", "bottom-right")
     * - `logoUrl`: (string) URL to logo image for branding
     *
     */
    options?: Record<string, any>;
};
